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

export class Firebase {
  public static readonly getValidCredentials = (): {
    [key: string]: string
  } => {
    const {
      FIREBASE_BUCKET,
      FIREBASE_PROJECT_ID,
      FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_CLIENT_ID,
      FIREBASE_CLIENT_X509_CERT_URL,
      FIREBASE_DATABASE_URL,
    } = process.env
    const keyValue = {
      FIREBASE_BUCKET,
      FIREBASE_PROJECT_ID,
      FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY,
      FIREBASE_CLIENT_EMAIL,
      FIREBASE_CLIENT_ID,
      FIREBASE_CLIENT_X509_CERT_URL,
      FIREBASE_DATABASE_URL,
    }
    if (hasEmptyValueInObject(keyValue)) {
      throw new Error("One of the Firebase key was not initialized.")
    }
    return keyValue as { [key: string]: string }
  }

  public static readonly getFirebaseInitializeApp = () => {
    const validCredentials = this.getValidCredentials()
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(
          getFirebaseCredential(validCredentials)
        ),
        storageBucket: validCredentials.FIREBASE_BUCKET,
        databaseURL: validCredentials.FIREBASE_DATABASE_URL,
      })
    }
    return admin
  }

  public static readonly getStorageBucket = () =>
    Firebase.getFirebaseInitializeApp().storage().bucket()

  public static readonly getFirestore = () =>
    Firebase.getFirebaseInitializeApp().firestore()
}
