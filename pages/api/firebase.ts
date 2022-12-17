import { NextApiRequest, NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"
import formidable from "formidable"
import admin from "firebase-admin"
import { hasEmptyValueInObject } from "@/components/utils/common/object"

const getFirebaseCredential = (validCredentials: {
  [key: string]: string
}): any => {
  return {
    type: "service_account",
    project_id: validCredentials.FIREBASE_PROJECT_ID,
    private_key_id: validCredentials.FIREBASE_PRIVATE_KEY_ID,
    private_key: validCredentials.FIREBASE_PRIVATE_KEY,
    client_email: validCredentials.FIREBASE_CLIENT_EMAIL,
    client_id: validCredentials.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: validCredentials.FIREBASE_CLIENT_X509_CERT_URL,
  }
}

class Firebase {
  public static getValidCredentials = (): { [key: string]: string } => {
    const {
      FIREBASE_BUCKET,
      FIREBASE_PROJECT_ID,
      FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_CLIENT_ID,
      FIREBASE_CLIENT_X509_CERT_URL,
    } = process.env
    const keyValue = {
      FIREBASE_BUCKET,
      FIREBASE_PROJECT_ID,
      FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_CLIENT_ID,
      FIREBASE_CLIENT_X509_CERT_URL,
    }
    if (hasEmptyValueInObject(keyValue)) {
      throw new Error("One of the Firebase key was not initialized")
    }
    return keyValue as { [key: string]: string }
  }

  public static getFirebaseInitializeApp = () => {
    const validCredentials = this.getValidCredentials()

    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(
          getFirebaseCredential(validCredentials)
        ),
        storageBucket: validCredentials.FIREBASE_BUCKET,
      })
    }
    return admin
  }

  public static getStorageBucket = () =>
    Firebase.getFirebaseInitializeApp().storage().bucket()
}

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

const fetchFileExtension = (filename: string) => {
  const idxWithDotIncluded = filename.lastIndexOf(".")
  if (idxWithDotIncluded < 1) {
    return ""
  } else {
    return filename.substring(idxWithDotIncluded)
  }
}

const uploadIntoSystem = async (
  req: NextApiRequest,
  res: NextApiResponse,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void
) => {
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
  const form = formidable({})
  form.onPart = (part) => {
    if (!part.originalFilename || !part.mimetype) {
      res.status(500).json({
        status: "fail",
        error: "File provided has issues",
      })
      reject()
      return
    }
    const uploadFileName =
      new Date().getTime() + fetchFileExtension(part.originalFilename)
    const cloudFileName = storageBucket.file(uploadFileName)
    option.metadata.contentType = part.mimetype

    part
      .pipe(cloudFileName.createWriteStream(option))
      .on("error", function (err) {
        res.status(500).json({
          status: "fail",
          error: `File stream failed. ${err.message}`,
        })
        reject()
      })
      .on("finish", async function () {
        try {
          const uploadedFileUrl = await getUploadedFileUrl(uploadFileName, uuid)
          res.status(200).json({
            status: "ok",
            data: uploadedFileUrl,
          })
          resolve("ok")
        } catch (e: any) {
          res.status(400).json({
            status: "fail",
            error: `File not downloadable. ${e.message}`,
          })
          reject()
        }
      })
  }
  form.parse(req, function () {
    //Do nothing, it's to kickstart onPart
  })
}

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json")
  switch (req.method) {
    case "POST":
      return new Promise((resolve, reject) =>
        uploadIntoSystem(req, res, resolve, reject)
      )
      break
    default:
      res.status(405).json({
        error: `method ${req.method} not recognized.`,
      })
  }
}

export default handler
