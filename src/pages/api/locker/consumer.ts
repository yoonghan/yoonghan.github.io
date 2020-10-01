import { NextApiRequest, NextApiResponse } from 'next';
import Server from 'socket.io';
import { withKafkaConsumer, createKafkaConf } from '../../../modules/kafka';
import { EnumAirtables, withAirtable } from '../../../modules/airtable';
import ApiController from "../../../shared/api";
import { PUSHER } from "../../../shared/const";

const _writer = (pusher:any, airtable:any, channelName:string) => (message: string) => {
  try{
    const messageInJson = JSON.parse(message);
    airtable.create(EnumAirtables.LOCK_LOG, [
      {
        "fields": {
          "Order Id": messageInJson.orderId,
          "Business Partner Id": [messageInJson.businessPartnerId],
          "Locker Id": messageInJson.lockerid,
          "Status": messageInJson.state,
          "Trigger DateTime": messageInJson.triggerTime
        }
      }
    ]);
  }
  catch(err) {
    //skip
  }

  pusher.trigger(
    `${PUSHER.channel_prefix}${channelName}`,
    `${PUSHER.event}`,
    {
    "message": message
    },
    () => {}
  );
}

const consumeMessages = async (req: NextApiRequest, res: NextApiResponse, airtable: any) => {
  const {groupid} = req.body;
  const {TWICE_NONAUTH_APP_ID, TWICE_NONAUTH_APP_KEY, TWICE_NONAUTH_SECRET, TWICE_CHANNEL_NAME, PUSHER_CLUSTER} = process.env;
  const {KAFKA_PREFIX, KAFKA_BROKER_LIST, KAFKA_USERNAME, KAFKA_PASSWORD} = process.env;
  const kafkaConf = createKafkaConf(KAFKA_BROKER_LIST.split(','), KAFKA_USERNAME, KAFKA_PASSWORD);

  const pusher = ApiController._createPusher(TWICE_NONAUTH_APP_ID, TWICE_NONAUTH_APP_KEY, TWICE_NONAUTH_SECRET, PUSHER_CLUSTER);
  if(pusher !== null && typeof pusher !== "undefined") {
    const pusherWriter = _writer(pusher, airtable, TWICE_CHANNEL_NAME);
    try{
      const disconnect = await withKafkaConsumer(kafkaConf, KAFKA_PREFIX, groupid, pusherWriter);
      res.status(200).json({"status": "initiated"});

      setTimeout(() => {
        disconnect();
      }, (req.body.wait?parseInt(req.body.wait, 10): 15000) );
    }
    catch(err) {
      pusherWriter(err);
      _writer();
    }
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
  const airtable = withAirtable(process.env.AIRTABLE_API_KEY, process.env.AIRTABLE_BASE);

  switch(req.method) {
    case "POST":
      consumeMessages(req, res, airtable);
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
