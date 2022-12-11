import { NextApiRequest, NextApiResponse } from "next"
import Pusher from "pusher"

export type ResponseMessage = {
  message?: string
  auth?: string
}

export class PusherAPIClient {
  public static client: Pusher | undefined = PusherAPIClient.initPusher()

  public static initPusher() {
    const { PUSHER_APP_KEY, PUSHER_APP_ID, PUSHER_SECRET, PUSHER_CLUSTER } =
      process.env
    if (process && PUSHER_APP_KEY) {
      const pusherClient = new Pusher({
        appId: PUSHER_APP_ID || "",
        key: PUSHER_APP_KEY,
        secret: PUSHER_SECRET || "",
        cluster: PUSHER_CLUSTER || "",
        useTLS: true,
      })
      return pusherClient
    }
    return undefined
  }

  public static reInitialize() {
    PusherAPIClient.client = PusherAPIClient.initPusher()
  }
}

const postMessage = (req: NextApiRequest, res: NextApiResponse) => {
  const { socket_id, channel_name } = req.body
  const client = PusherAPIClient.client
  if (client) {
    const authToken = client.authorizeChannel(socket_id, channel_name)

    if (authToken?.auth && authToken.auth !== "") {
      res.status(200).json(authToken)
    } else {
      res.status(401).json({ error: "Not authorized." })
    }
  } else {
    res
      .status(500)
      .json({ error: "Pusher initialized values has not been set." })
  }
}

const sendMethodError = (res: NextApiResponse, message: string) => {
  res.status(405).json({
    error: message,
  })
}

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseMessage>
) => {
  res.setHeader("Content-Type", "application/json")

  switch (req.method) {
    case "POST":
      postMessage(req, res)
      break
    default:
      sendMethodError(res, `Method ${req.method} not recognized.`)
  }
}

export const config = { runtime: "nodejs" }

export default handler
