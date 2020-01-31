import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from 'next';
import serviceAccount from "../../private/firebase-auth.json";
import uuidv4 from "uuid/v4";

const Singleton = (function () {
    var instance;

    function createInstance() {
      if(admin.apps.length === 0){
        const { FIREBASE_BUCKET } = process.env;
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: FIREBASE_BUCKET
        });
      }
      return admin;
    }

    return {
        getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
        }
    };
})();

const _storeFile = (res: NextApiResponse) => {
  const uuid = uuidv4();
  const storageBucket = Singleton.getInstance().storage().bucket();
  const filename = "type1.jpg";
  storageBucket.upload("./static/img/bg/"+filename, {
    //predefinedAcl: 'publicRead',
    gzip: true,
    metadata: {
      contentType: 'image/jpeg',
      cacheControl: 'public, max-age=3600',
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      }
    },
  }).then((data) => {
    const file = data[0];
    res.status(200).json({status: `https://firebasestorage.googleapis.com/v0/b/${file.metadata.bucket}/o/${file.metadata.name}?alt=media&token=${uuid}`});
  });
}

const _sendMethodError = (res:NextApiResponse, messages:Array<string>) => {
  res.status(405).json(
    {
      "error": messages.reduce((accumulator, message) => `${accumulator} , ${message}`)
    }
  );
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  switch(req.method) {
    case 'POST':
      _storeFile(res);
      break;
    default:
      _sendMethodError(
        res,
        [
          `method ${req.method} not recognized.`
        ]
      );
  }
}
