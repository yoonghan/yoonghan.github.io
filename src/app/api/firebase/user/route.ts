import { NextRequest, NextResponse } from "next/server"
import admin from "firebase-admin"
import { getAuth } from "firebase-admin/auth"
import { hasEmptyValueInObject } from "@/components/utils/common/object"
import { validEmail, validInput } from "../../../../util/validator"

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
      FIREBASE_PROJECT_ID,
      FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_CLIENT_ID,
      FIREBASE_CLIENT_X509_CERT_URL,
    } = process.env
    const keyValue = {
      FIREBASE_PROJECT_ID,
      FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_CLIENT_ID,
      FIREBASE_CLIENT_X509_CERT_URL,
    }
    if (hasEmptyValueInObject(keyValue)) {
      throw new Error("One of the Firebase key was not initialized.")
    }
    return keyValue as { [key: string]: string }
  }

  public static getFirebaseInitializeApp = () => {
    const validCredentials = this.getValidCredentials()
    if (admin.apps.length === 0) {
      return admin.initializeApp({
        credential: admin.credential.cert(
          getFirebaseCredential(validCredentials)
        ),
      })
    }
  }

  public async createUser(
    email: string,
    password: string,
    additionalInfo: AdditionalInfo
  ) {
    if (!validEmail(email)) {
      throw new Error("Invalid email.")
    }

    if (!validInput(password)) {
      throw new Error("Invalid password.")
    }

    Firebase.getFirebaseInitializeApp()
    return getAuth().createUser({
      ...additionalInfo,
      password: password,
      uid: email,
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const response = await new Firebase().createUser(
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
