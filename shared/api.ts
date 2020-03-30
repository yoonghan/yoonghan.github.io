import Pusher from 'pusher';
import admin from "firebase-admin";
import { PUSHER } from "./const";
import serviceAccount from "../private/firebase-auth.json";

/**
 * Deprecated as api!!!
 * Not in used anymore. It is to sent/trigger client messages to pusher.
 * But noticed when deployed into Now.sh server, trigger does not get sent instead it is buffered
 * into the webserver. I.e. after 4th message sent, the first message get received.
 * This behavior is not noticible in dev.
 **/

class ApiController {
  public static AUTH_API_URL=ApiController._getUrl();
  public static CODE_GEN:string = ApiController._generateCode();
  public static PUSHER_API_CLIENT:Pusher|undefined = ApiController._initPusher();

  private static _getUrl() {
    const { AUTH_API_CALL } = process.env;
    return AUTH_API_CALL;
  }

  public static getFirebaseInitializeApp = () => {
    if(admin.apps.length === 0){
      const { FIREBASE_BUCKET, FIREBASE_DATABASE } = process.env;
      const _serviceAccount = serviceAccount as any; //Intended
      admin.initializeApp({
          credential: admin.credential.cert(_serviceAccount),
          storageBucket: FIREBASE_BUCKET,
          databaseURL: FIREBASE_DATABASE
      });
    }
    return admin;
  }

  /**
   * API is generated for every machine start up and is shared by all users
   **/
  private static _generateCode():string {
    // const randNumber = Math.random();
    // return randNumber.toString(36).substr(2, 9);
    // Generated based on dates, reason being that server keeps restarting.
    const date = new Date();
    return "G" + (date.getDate()+date.getMonth()+date.getFullYear());
  }

  /**
   * Initialize Pusher api.
   **/
  public static _initPusher() {
    if(process && process.env.PUSHER_APP_KEY) {
      const {
        PUSHER_APP_ID,
        PUSHER_SECRET,
        PUSHER_APP_KEY,
        PUSHER_CLUSTER
      } = process.env;
      const pusherClient = new Pusher({
        appId: PUSHER_APP_ID||'',
        key: PUSHER_APP_KEY||'',
        secret: PUSHER_SECRET||'',
        cluster: PUSHER_CLUSTER||'',
        useTLS: true
      });

      return pusherClient;
    }
    return undefined;
  }

  public static _initNonAuthPusher() {
    if(process && process.env.PUSHER_NONAUTH_APP_KEY) {
      const {
        PUSHER_NONAUTH_APP_ID,
        PUSHER_NONAUTH_SECRET,
        PUSHER_NONAUTH_APP_KEY,
        PUSHER_CLUSTER
      } = process.env;
      const pusherClient = new Pusher({
        appId: PUSHER_NONAUTH_APP_ID||'',
        key: PUSHER_NONAUTH_APP_KEY||'',
        secret: PUSHER_NONAUTH_SECRET||'',
        cluster: PUSHER_CLUSTER||'',
        useTLS: true
      });

      return pusherClient;
    }
    return undefined;
  }

  static getPusherApiClient():Pusher {
    if(typeof this.PUSHER_API_CLIENT === 'undefined') {
      throw "No go, no pusher api";
    }
    return this.PUSHER_API_CLIENT;
  }

  static getCodeGen():string {
    return this.CODE_GEN;
  }

  static getChannelName(codeGen:string) {
    return `${PUSHER.channel_prefix}${codeGen}`;
  }

  static getStatusOfChannel(callback:(error:any, success?:string)=>void) {
    const pusherClient = this.getPusherApiClient();
    if(pusherClient) {
      pusherClient.get({ path: '/channels', params: {} }, function(error, {}, response) {
      	if (response.statusCode === 200) {
      		const result = JSON.parse(response.body);
      		const channelsInfo = result.channels;

          callback(null, channelsInfo);
      	}
        else {
          callback(error);
        }
      });
    }
    else {
      callback("Not started");
    }
  }
}

export default ApiController;
