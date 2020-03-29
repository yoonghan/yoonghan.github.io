import { NextApiRequest, NextApiResponse } from 'next';
import ApiController from "../../shared/api";
import uuidv4 from "uuid/v4";
import formidable from "formidable";

const _sendMethodError = (res:NextApiResponse, messages:Array<string>) => {
  res.status(405).json(
    {
      "error": messages.reduce((accumulator, message) => `${accumulator} , ${message}`)
    }
  );
}

const getUploadedFileUrl = async (uploadFileName: string, retrieveToken: string, res: NextApiResponse) => {
  const storageBucket = ApiController.getFirebaseInitializeApp().storage().bucket();
  const cloudFileName = storageBucket.file(uploadFileName);
  try {
    const cloudFile = (await cloudFileName.get())[0];

    const firebaseUrl = "https://firebasestorage.googleapis.com/v0/b/";
    const fileUrl = `${firebaseUrl}${cloudFile.metadata.bucket}/o/${cloudFile.metadata.name}?alt=media&token=${retrieveToken}`;
    res.status(200).json({
      status: "ok",
      data: fileUrl
    });
  }
  catch(e) {
    res.status(400).json({
      status: "fail",
      error: `File not downloadable. ${e}`
    });
  }
}

const fetchFileExtension = (filename: string) => {
  const idxWithDotIncluded = filename.lastIndexOf(".");
  if(idxWithDotIncluded < 1){
    return "";
  }
  else {
    return filename.substring(idxWithDotIncluded);
  }
}

const uploadIntoSystem = async (req: NextApiRequest, res: NextApiResponse) => {
  const uuid = uuidv4();
  const storageBucket = ApiController.getFirebaseInitializeApp().storage().bucket();
  const option = {
    //predefinedAcl: 'publicRead',
    gzip: true,
    metadata: {
      contentType: '',
      cacheControl: 'public, max-age=3600',
      metadata: {
        firebaseStorageDownloadTokens: uuid,
      }
    },
  };
  const form = new formidable.IncomingForm();
  form.onPart = function(part) {
    if(!part.filename || !part.mime || part.mime === null) {
      return;
    }
    const uploadFileName = new Date().getTime() + fetchFileExtension(part.filename);
    const cloudFileName = storageBucket.file(uploadFileName);
    option.metadata.contentType = (part.mime as string);

    part.pipe(cloudFileName.createWriteStream(option))
    .on('error', function(err) {
      console.log("Upload Issue" + err);
      res.status(500).json({
        status: "fail",
        error:"File stream failed"
      });
    })
    .on('finish', function() {
      getUploadedFileUrl(uploadFileName, uuid, res);
    });
  };
  form.parse(req, function() {
    //Do nothing, it's to kickstart onPart
  });
}

export const config = {
    api: {
      bodyParser: false,
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  switch(req.method) {
    case "POST":
      uploadIntoSystem(req, res);
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
