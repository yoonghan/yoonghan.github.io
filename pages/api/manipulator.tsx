import { NextApiResponse } from 'next';
import Pusher from 'pusher';
import { PUSHER } from "../../shared/const";

//req: NextApiRequest
export default ({}, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  console.log("Connecting");
  if(process && process.env.PUSHER_APP_KEY) {
    const {
      PUSHER_APP_ID,
      PUSHER_SECRET,
      PUSHER_APP_KEY,
      PUSHER_CLUSTER
    } = process.env;

    const channels_client = new Pusher({
      appId: PUSHER_APP_ID||'',
      key: PUSHER_APP_KEY||'',
      secret: PUSHER_SECRET||'',
      cluster: PUSHER_CLUSTER||'',
      encrypted: true
    });

    console.log("Connected");

    channels_client.trigger(PUSHER.channel, PUSHER.event, {
      "message": "hello world"
    });

    res.status(200).json({ title: `${PUSHER_APP_ID}-${PUSHER_CLUSTER}-${PUSHER.channel}` });
  }
}
