import Pusher from "pusher"

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
