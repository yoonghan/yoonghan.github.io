import { NextApiRequest, NextApiResponse } from 'next';
import { PUSHER } from "../../shared/const";
import ApiController from "../../shared/api";

const _validInput = (input:string) => {
  if(
    typeof input === "undefined" ||
    input === null ||
    input.trim() === ""
  ) {
    return false;
  }
  return true;
}

const _sendError = (res:NextApiResponse, messages:Array<string>) => {
  res.status(400).json(
    {
      "error": messages.reduce((accumulator, message) => `${accumulator} , ${message}`)
    }
  );
}

const _sendMethodError = (res:NextApiResponse, messages:Array<string>) => {
  res.status(405).json(
    {
      "error": messages.reduce((accumulator, message) => `${accumulator} , ${message}`)
    }
  );
}

const _getCodeGen = (res: NextApiResponse) => {
  res.status(200).json(
    {
      "codegen": ApiController.getCodeGen()
    }
  );
}

const _validatePost = (req: NextApiRequest):Array<string> => {
  const {codegen, message} = req.body;

  const errorMessages = [];
  if(!_validInput(codegen)) {
    errorMessages.push("Codegen is empty");
  }
  if(!_validInput(message)) {
    errorMessages.push("Message is empty");
  }
  if(ApiController.getCodeGen() !== codegen) {
    errorMessages.push("Invalid Codegen");
  }

  return errorMessages;
}

const _postMessage = (req: NextApiRequest, res: NextApiResponse) => {
  const errorMessages = _validatePost(req);
  if(errorMessages.length !== 0 ) {
    _sendError(
      res,
      errorMessages
    );
    return;
  }

  const {codegen, message} = req.body;

  try {
    const client = ApiController.getPusherApiClient(codegen);

    client.trigger(PUSHER.channel, PUSHER.event, {
      "message": message
    });
    res.status(200).json(
      {
        message: `message:"${message}" to channel:"${PUSHER.channel}" sent.`
      }
    );
  } catch(exception) {
    res.status(500).json(
      {
        error: exception
      }
    );
  }
}

const _getStatus = (res: NextApiResponse) => {
  function callback(error:any, success?:string) {
    if(error !== null && typeof error !== "undefined") {
      res.status(500).json(
        {
          error: error
        }
      );
    }
    else {
      res.status(200).json(
        {
          channels: success
        }
      );
    }
  }
  ApiController.getStatusOfChannel(callback);
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  switch(req.method) {
    case 'GET':
      _getCodeGen(res);
      break;
    case 'POST':
      _postMessage(req, res);
      break;
    case 'LINK':
      _getStatus(res);
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
