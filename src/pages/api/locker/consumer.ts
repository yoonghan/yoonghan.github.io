import { NextApiRequest, NextApiResponse } from 'next';
import Server from 'socket.io';
import { withKafkaConsumer } from '../../../modules/kafka';
import ApiController from "../../../shared/api";
import { PUSHER } from "../../../shared/const";

const _writer = (pusher:any, channelName:string) => (message: string) => {
  pusher.trigger(
    `${PUSHER.channel_prefix}${channelName}`,
    `${PUSHER.event}`,
    {
    "message": message
    },
    () => {}
  );
}

const consumeMessages = async (req: NextApiRequest, res: NextApiResponse) => {
  const {groupid} = req.body;
  const {TWICE_NONAUTH_APP_ID, TWICE_NONAUTH_APP_KEY, TWICE_NONAUTH_SECRET, TWICE_CHANNEL_NAME, PUSHER_CLUSTER} = process.env;
  const pusher = ApiController._createPusher(TWICE_NONAUTH_APP_ID, TWICE_NONAUTH_APP_KEY, TWICE_NONAUTH_SECRET, PUSHER_CLUSTER);
  if(pusher !== null && typeof pusher !== "undefined") {
    const disconnect = await withKafkaConsumer(groupid, _writer(pusher, TWICE_CHANNEL_NAME));
    setTimeout(() => {
      disconnect();
      res.status(200).json({"status": "ok"});
    }, 15000);
  }
  else {
    res.status(400).json({"status": "fail"});
  }
}


const _sendMethodError = (res:NextApiResponse, messages:Array<string>) => {
  res.status(405).json(messages);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  switch(req.method) {
    case "POST":
      consumeMessages(req, res);
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
