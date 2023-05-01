import {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
} from "@/util/regex"
import { NextApiRequest, NextApiResponse } from "next"
import Pusher, { PresenceChannelData } from "pusher"

export type ResponseMessage = {
  message?: string
  auth?: string
}

export class PusherAPIClient {
  public static client: Pusher | undefined = PusherAPIClient.initPusher()

  public static initPusher() {
    const {
      NEXT_PUBLIC_PUSHER_APP_KEY,
      PUSHER_APP_ID,
      PUSHER_SECRET,
      NEXT_PUBLIC_PUSHER_CLUSTER,
    } = process.env
    if (process && NEXT_PUBLIC_PUSHER_APP_KEY) {
      const pusherClient = new Pusher({
        appId: PUSHER_APP_ID || "",
        key: NEXT_PUBLIC_PUSHER_APP_KEY,
        secret: PUSHER_SECRET || "",
        cluster: NEXT_PUBLIC_PUSHER_CLUSTER || "",
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

const extractPresenceData = (req: NextApiRequest) => {
  const { username } = req.query
  if (
    typeof username !== "string" ||
    username.trim() === "" ||
    !isOnlyAlphabetsAndNumberAndSpace(username)
  ) {
    return null
  }

  return {
    user_id: removeAllWhiteSpaces(username),
    user_info: { name: username },
  }
}

const authorize = (
  client: Pusher,
  socket_id: string,
  channel_name: string,
  presenceData: PresenceChannelData
) => client.authorizeChannel(socket_id, channel_name, presenceData)

const postMessage = (req: NextApiRequest, res: NextApiResponse) => {
  const { socket_id, channel_name } = req.body
  const client = PusherAPIClient.client
  const presenceData = extractPresenceData(req)
  if (client === null || client === undefined) {
    res
      .status(500)
      .json({ error: "Pusher initialized values has not been set." })
  } else if (presenceData === null) {
    res.status(400).json({ error: "Username defined is not valid." })
  } else {
    const authToken = authorize(client, socket_id, channel_name, presenceData)
    if (authToken?.auth && authToken.auth !== "") {
      res.status(200).json(authToken)
    } else {
      res.status(401).json({ error: "Not authorized." })
    }
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
