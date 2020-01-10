import { NextApiRequest, NextApiResponse } from 'next';
import ApiController from "../../shared/api";

const _postMessage = (req: NextApiRequest, res: NextApiResponse) => {
  const {socket_id, channel_name} = req.body;
  const codeGen = ApiController.getCodeGen();

  if(channel_name.endsWith(ApiController.getChannelName())) {
    const client = ApiController.getPusherApiClient(codeGen);
    const auth = client.authenticate(socket_id, channel_name);

    if(auth) {
      res.status(200).json(auth);
    }
    else {
      res.status(500).json({error: "Not authorized"});
    }
  }
  else {
    console.error(ApiController.getChannelName() + "-" + channel_name)
    res.status(500).json({error: "Channel expired"});
  }
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
      _postMessage(req, res);
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
