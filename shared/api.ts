import Pusher from 'pusher';

class ApiController {
  private static CODE_GEN:string = ApiController._generateCode();
  private static PUSHER_API_CLIENT:Pusher|undefined = ApiController._initPusher();

  /**
   * API is generated for every machine start up and is shared by all users
   **/
  private static _generateCode() {
    const randNumber = Math.random();
    return randNumber.toString(36).substr(2, 9);
  }

  /**
   * Initialize Pusher api.
   **/
  private static _initPusher() {
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
        encrypted: true
      });

      return pusherClient;
    }
    return undefined;
  }

  static getPusherApiClient(codeGen:string):Pusher {
    if(codeGen !== this.CODE_GEN) {
      throw "Invalid code generation provided";
    }
    if(typeof this.PUSHER_API_CLIENT === 'undefined') {
      throw "No go, no pusher api";
    }
    return this.PUSHER_API_CLIENT;
  }

  static getCodeGen() {
    return this.CODE_GEN;
  }

  static getStatusOfChannel(callback:(error:any, success?:string)=>void) {
    const pusherClient = this.getPusherApiClient(this.getCodeGen());
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
