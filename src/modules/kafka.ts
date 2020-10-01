`use strict`

/** Failed project, unfortunately not able to exeute in a servless cloud**/
import Kafka from 'kafkajs';
import ApiController from "../shared/api";
import { PUSHER } from "../shared/const";

function _getTopic(prefix:string) { return `${prefix}default`}

export function createKafkaConf (
  brokerList: Array<string>,
  username: string,
  password: string
) {
  const config = {
    clientId: 'my-app',
    brokers: brokerList,
    ssl: true,
    connectionTimeout: 10000,
    logCreator: WinstonLogCreator,
    sasl: {
      mechanism: ('scram-sha-256' as any),
      username: username,
      password: password
    }
  };
  return new Kafka.Kafka(config);
}

const WinstonLogCreator = (logLevel) => {
  const {TWICE_NONAUTH_APP_ID, TWICE_NONAUTH_APP_KEY, TWICE_NONAUTH_SECRET, TWICE_CHANNEL_NAME, PUSHER_CLUSTER} = process.env;
  const pusher = ApiController._createPusher(TWICE_NONAUTH_APP_ID, TWICE_NONAUTH_APP_KEY, TWICE_NONAUTH_SECRET, PUSHER_CLUSTER);

  return ({ namespace, level, label, log }) => {
    pusher.trigger(
      `${PUSHER.channel_prefix}${TWICE_CHANNEL_NAME}`,
      `${PUSHER.event}`,
      {
      "message": `${JSON.stringify(log)}`
      },
      () => {}
    );
  }
}

export async function withKafkaProducer(kafkaClient:any, prefix:string) {
  const producer = kafkaClient.producer();
  await producer.connect();

  const writer = (msg:string) => {
    producer.send(
      {
        topic: _getTopic(prefix),
        messages: [{value: msg}]
      }
    );
  }

  return writer;
}

export async function withKafkaConsumer(kafkaClient:any, prefix:string, groupId:string, writer:(msg:string) => void) {
  //Kafka guarantees that a message is only read by a single consumer in the group.
  const consumer = kafkaClient.consumer({groupId});
  await consumer.connect();
  await consumer.subscribe({topic: _getTopic(prefix)});

  const disconnect = () => {
    console.log('disconnected')
    consumer.disconnect();
  }

  const _consumeMessage = () => {
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // console.log({
        //     key: message.key.toString(),
        //     value: message.value.toString(),
        //     headers: message.headers,
        // })
        try{
          writer(message.value.toString());
        }
        catch(err) {
          writer(">>" + err);
        }
      },
    })
  }

  _consumeMessage();

  return disconnect;
}
