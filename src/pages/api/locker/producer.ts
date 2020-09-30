import { NextApiRequest, NextApiResponse } from 'next';
import { withKafkaProducer, createKafkaConf } from '../../../modules/kafka';

export const config = {
    api: {
      bodyParser: true,
    }
};

const write = async (req: NextApiRequest, res: NextApiResponse, writer: any) => {
  const message = req.body;
  message.triggerTime = new Date().toISOString();
  writer(JSON.stringify(message));
  res.status(200).json({'status': 'ok'});
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {KAFKA_PREFIX, KAFKA_BROKER_LIST, KAFKA_USERNAME, KAFKA_PASSWORD} = process.env;
  const kafkaConf = createKafkaConf(KAFKA_BROKER_LIST.split(','), KAFKA_USERNAME, KAFKA_PASSWORD);

  switch(req.method) {
    case "POST":
      const writer = await withKafkaProducer(kafkaConf, KAFKA_PREFIX);
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
