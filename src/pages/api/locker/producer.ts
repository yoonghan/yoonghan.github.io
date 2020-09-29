import { NextApiRequest, NextApiResponse } from 'next';
import { withKafkaProducer } from '../../../modules/kafka';

export const config = {
    api: {
      bodyParser: true,
    }
};

const write = async (req: NextApiRequest, res: NextApiResponse, writer: any) => {
  const {message} = req.body;
  writer(message);
  res.status(200).json({'status': 'ok'});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

  switch(req.method) {
    case "POST":
      const writer = await withKafkaProducer();
      write(req, res, writer);
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
