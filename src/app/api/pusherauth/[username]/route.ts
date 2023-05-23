import {
  isOnlyAlphabetsAndNumberAndSpace,
  removeAllWhiteSpaces,
  capitalizeFirstWord,
} from "@/util/regex"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { NextRequest, NextResponse } from "next/server"
import Pusher, { PresenceChannelData } from "pusher"
import { PusherAPIClient } from "../PusherAPIClient"

export type ResponseMessage = {
  message?: string
  auth?: string
}

type Member = {
  user_id: string
  user_info: {
    name: string
  }
}

export const extractPresenceData = (
  username: string | string[] | undefined
): Member | null => {
  if (
    typeof username !== "string" ||
    username.trim() === "" ||
    !isOnlyAlphabetsAndNumberAndSpace(username)
  ) {
    return null
  }

  const trimmedUsername = username.trim()

  return {
    user_id: removeAllWhiteSpaces(trimmedUsername.toLocaleLowerCase()),
    user_info: { name: capitalizeFirstWord(trimmedUsername) },
  }
}

const authorize = (
  client: Pusher,
  socket_id: string,
  channel_name: string,
  presenceData: PresenceChannelData
) => client.authorizeChannel(socket_id, channel_name, presenceData)

const userExists = async (
  pusherClient: Pusher,
  channel_name: string,
  userid: string
) => {
  const res = await pusherClient.get({
    path: `/channels/${channel_name}/users`,
  })
  if (res.status === 200) {
    const body = await res.json()
    return (
      body.users.filter((user: { id: string }) => user.id === userid).length > 0
    )
  }
  return false
}

const postMessage = async (req: NextRequest, userName: string) => {
  const formData = await req.formData()
  const socket_id = formData.get("socket_id")?.toString() || ""
  const channel_name = formData.get("channel_name")?.toString() || ""

  const client = PusherAPIClient.client

  const presenceData = extractPresenceData(userName)

  if (client === null || client === undefined) {
    return NextResponse.json(
      { error: "Pusher initialized values has not been set." },
      {
        status: 500,
      }
    )
  }

  if (presenceData === null) {
    return NextResponse.json(
      { error: "Username defined is not valid." },
      {
        status: 400,
      }
    )
  }

  if (await userExists(client, channel_name, presenceData.user_id)) {
    return NextResponse.json(
      { error: "User already exist." },
      {
        status: 409,
      }
    )
  }

  const authToken = authorize(client, socket_id, channel_name, presenceData!)
  if (authToken?.auth && authToken.auth !== "") {
    return NextResponse.json(authToken)
  } else {
    return NextResponse.json(
      { error: "Not authorized." },
      {
        status: 401,
      }
    )
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    return await postMessage(request, params.username)
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message,
      },
      { status: 405 }
    )
  }
}
