import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { Blob } from "node:buffer"
import { Firebase } from "./Firebase"

const uploadIntoSystem = async (
  req: NextRequest,
  resolve: (value: string) => void,
  reject: (reason?: unknown) => void
) => {
  const getUploadedFileUrl = async (
    uploadFileName: string,
    retrieveToken: string
  ) => {
    const storageBucket = Firebase.getStorageBucket()
    const cloudFileName = storageBucket.file(uploadFileName)
    const cloudFile = (await cloudFileName.get())[0]
    const firebaseUrl = "https://firebasestorage.googleapis.com/v0/b/"
    return `${firebaseUrl}${cloudFile.metadata.bucket}/o/${cloudFile.metadata.name}?alt=media&token=${retrieveToken}`
  }

  try {
    const uuid = uuidv4()
    const storageBucket = Firebase.getStorageBucket()
    const option = {
      gzip: true,
      metadata: {
        contentType: "",
        cacheControl: "public, max-age=3600",
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    }

    const formData = await req.formData()
    const file = formData.get("file")
    if (file === null) {
      reject("No file to process")
      return
    }
    const filename: string = (file as any).name
    const uploadFileName = `${new Date().getTime()}${filename}`

    if (!(file instanceof Blob)) {
      reject("File uploaded is not a valid")
      return
    }

    const fileStream: any = file.stream()
    const chunks = []
    for await (const chunk of fileStream) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks as any)

    const googleCloud = storageBucket.file(uploadFileName)

    const stream = require("stream")
    // Create a pass through stream from a string
    const passthroughStream = new stream.PassThrough()
    passthroughStream.write(buffer)
    passthroughStream.end()

    const writeStream = googleCloud.createWriteStream(option)

    const streamFileUpload = async () => {
      passthroughStream.pipe(writeStream).on("finish", async () => {
        try {
          const uploadedFileUrl = await getUploadedFileUrl(uploadFileName, uuid)
          resolve(uploadedFileUrl)
        } catch (e: any) {
          reject(`File not downloadable. ${e.message}`)
        }
      })
    }

    streamFileUpload()

  } catch (err: any) {
    reject(err?.message)
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await new Promise<string>((resolve, reject) =>
      uploadIntoSystem(request, resolve, reject)
    )
    return NextResponse.json({ data: response, status: "ok" })
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err,
      },
      { status: 405 }
    )
  }
}
