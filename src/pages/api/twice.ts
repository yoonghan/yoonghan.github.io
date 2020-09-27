import { NextApiRequest, NextApiResponse } from 'next';

const logUpdatedRecord = async (req: NextApiRequest, res: NextApiResponse) => {
  const {updatedRecord} = req.body;
  console.log(updatedRecord)
  ref.set(updatedRecord);
  res.status(200).json({"status": "ok"});
}


const _sendMethodError = (res:NextApiResponse, messages:Array<string>) => {
  res.status(405).json(messages);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');
  switch(req.method) {
    case "POST":
      logUpdatedRecord(req, res);
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
