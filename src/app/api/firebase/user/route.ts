import { NextRequest, NextResponse } from "next/server"
import { getAuth } from "firebase-admin/auth"
import {
  emailMatcher,
  inputMatcher,
  validEmail,
  validInput,
} from "../../../../util/validator"
import { describe } from "hamjest"
import { type AdditionalInfo } from "./types/AdditionalInfo"
import { Firebase } from "../Firebase"

const createUser = (
  email: string,
  password: string,
  additionalInfo: AdditionalInfo
) => {
  if (!validEmail(email)) {
    throw new Error(`Email must be ${describe(emailMatcher)}.`)
  }

  if (!validInput(password)) {
    throw new Error(`Password must be ${describe(inputMatcher)}.`)
  }

  Firebase.getFirebaseInitializeApp()
  return getAuth().createUser({
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
