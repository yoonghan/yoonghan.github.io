import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from 'next';
import serviceAccount from "../../private/firebase-auth.json";

const Singleton = (function () {
    var instance;

    function createInstance() {
      admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          storageBucket: "legocontroller-5c4f6.appspot.com"
      });
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
  const storageBucket = Singleton.getInstance().storage().bucket();
  const filename = "./README.md";
  storageBucket.upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });
  res.status(200);
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
    case 'GET':
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
