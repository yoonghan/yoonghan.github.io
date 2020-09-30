`use strict`
import { useState, useEffect } from "react";
import Kafka from 'node-rdkafka';

const kafkaConf = {
  "metadata.broker.list": ["tricycle-01.srvs.cloudkafka.com:9094", "tricycle-02.srvs.cloudkafka.com:9094", "tricycle-03.srvs.cloudkafka.com:9094"],
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "w8aimn9f",
  "sasl.password": "YODPec9QQELZfpqwa3ciIdxWKtJYJBtx",
  "debug": "generic,broker,security"
};

const prefix = "w8aimn9f";
const topic = `${prefix}-default`;

export function withKafkaProducer() {
  const producer = new Kafka.Producer(kafkaConf);
  const genMessage = msg => Buffer.from(`${msg}`);

  const write = (msg:string) => {
    producer.produce(topic, -1, genMessage(msg), null);
  }

  const disconnect = () => {
    producer.disconnect();
  }

  return new Promise((resolve, reject) => {
    producer.on("ready", function(arg) {
      resolve(write);
    });

    producer.on("disconnected", function(arg) {
      reject(new Error('disconnected'));
    });

    producer.on('event.error', function(err) {
      reject(err);
    });

    producer.on('event.log', function(log) {
      //console.log(log);
    });

    producer.connect();
  });
}

export function withKafkaConsumer(groupId:string, writer:(msg:string) => void) {
  //Kafka guarantees that a message is only read by a single consumer in the group.
  const consumerConf = kafkaConf;
  consumerConf['group.id'] = groupId;

  const consumer = new Kafka.KafkaConsumer(consumerConf, {
    "auto.offset.reset": "beginning"
  });

  const disconnect = () => {
    consumer.disconnect();
  }

  return new Promise((resolve, reject) => {
    consumer.on("error", function(err) {
      reject(err);
    });

    consumer.on("ready", function(arg) {
      console.log(`Consumer ${arg.name} ready`);
      consumer.subscribe([topic]);
      consumer.consume();
      resolve(disconnect);
    });

    consumer.on("disconnected", function(arg) {
      reject(new Error('disconnected'));
    });

    consumer.on('event.error', function(err) {
      reject(err);
    });


    consumer.on("data", function(m) {
      const message = m.value.toString();
      writer(message);
      consumer.commit(m);
    });

    consumer.on('event.log', function(log) {
      //console.log(log);
    });

    consumer.connect();
  });
}
