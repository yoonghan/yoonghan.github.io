import admin from "firebase-admin";
import PusherJS from 'pusher-js';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiController from "../../shared/api";
import serviceAccount from "../../private/firebase-auth.json";
import uuidv4 from "uuid/v4";
import formidable from "formidable";
import { PUSHER } from "../../shared/const";


const getRef = () => {
  const db = ApiController.getFirebaseInitializeApp().database();
  const ref = db.ref("questionaires");
  return ref;
}

const sentToPusher = (message) => {
  const pusher = ApiController._initPusher();

  const channelName = `${PUSHER.channel_prefix}${'doctorx'}`;

  pusher.trigger(channelName, `${PUSHER.event}`, {
    "message": message
  });
}

const writeToDb = async (req: NextApiRequest, res: NextApiResponse) => {
  const {data} = req.body;
  const ref = getRef();
  const dataAsJSON = JSON.parse(data);
  ref.set(dataAsJSON);
  ref.on("value", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    sentToPusher(data);
  });

  res.status(200).json(
    {
      "status": "ok"
    }
  );
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
    default:
      _sendMethodError(
        res,
        [
          `method ${req.method} not recognized.`
        ]
      );
  }
}
