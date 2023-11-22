import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import { validEmail, validInput } from "../../../../util/validator"
import { type AdditionalInfo } from "./types/AdditionalInfo"
import { Firebase } from "../Firebase"

const createUser = (
  email: string,
  password: string,
  additionalInfo: AdditionalInfo
) => {
  if (!validEmail(email)) {
    throw new Error(
      "Email must be a string matching /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/."
    )
  }

  if (!validInput(password)) {
    throw new Error(
      "Password must be (is not {} and a string matching /^[a-z|A-Z|0-9|!|\\$|@|?|#|%|\\^]+$/ and a collection or string with size a number greater than <5>)."
    )
  }

  Firebase?.getFirebaseInitializeApp()
  return getAuth()?.createUser({
    ...additionalInfo,
    password: password,
    uid: email,
  })
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const response = await createUser(
      reqBody.email,
      reqBody.password,
      reqBody.additionalInfo
    )
    return NextResponse.json({ data: response, status: "ok" })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 400 })
  }
}

export function GET() {
  return NextResponse.json({
    data: { message: "API to manager Walcron users." },
    status: "ok",
  })
}
