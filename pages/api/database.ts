import { NextApiRequest, NextApiResponse } from 'next';
import ApiController from "../../shared/api";
import { PUSHER } from "../../shared/const";


const getRef = () => {
  const db = ApiController.getFirebaseInitializeApp().database();
  const ref = db.ref("questionaires");
  return ref;
}

const sentToPusher = (message: string, res: NextApiResponse) => {
  const pusher = ApiController._initNonAuthPusher();

  const channelName = `${PUSHER.channel_prefix}${'doctorx'}`;

  if(pusher !== null && typeof pusher !== "undefined") {
    pusher.trigger(
      channelName,
      `${PUSHER.event}`,
      {
      "message": message
      },
      () => {
        res.status(200).json(
          {
            "status": "ok"
          }
        )
      }
    );
  }
  else {
    res.status(400).json(
      {
        "status": "fail"
      }
    );
  }
}

const writeToDb = async (req: NextApiRequest, res: NextApiResponse) => {
  const {data} = req.body;
  const ref = getRef();
  const dataAsJSON = JSON.parse(data);
  ref.set(dataAsJSON);
  sentToPusher(data, res);
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
