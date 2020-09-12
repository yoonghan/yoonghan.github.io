import { NextApiRequest, NextApiResponse } from 'next';
import ApiController from "../../shared/api";

const getRef = () => {
  const db = ApiController.getFirebaseInitializeApp().database();
  const ref = db.ref("survey/");
  return ref;
}

const writeToDb = async (req: NextApiRequest, res: NextApiResponse) => {
  const {survey} = req.body;
  const ref = getRef();
  const dataAsJSON = survey;
  ref.set(dataAsJSON);
  res.status(200).json({"status": "ok"});
}

const readFromDb = async ({}, res: NextApiResponse) => {
  const ref = getRef();
  ref.once('value').then(function(snapshot) {
    const surveyInfo = snapshot.val();
    res.status(200).json(surveyInfo);
  });
}

const _sendMethodError = (res:NextApiResponse, messages:Array<string>) => {
  res.status(405).json(messages);
}

export const config = {
    api: {
      bodyParser: true,
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  switch(req.method) {
    case "POST":
      writeToDb(req, res);
      break;
    case "GET":
      readFromDb(req, res);
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
