/// <reference types="@legalthingy/shared"/>
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
	clientId: 'consumer',
	brokers: ['localhost:9092'],
});

export const consumer = kafka.consumer({ groupId: 'dikke-consumers' });

consumer.connect().then(() => console.log('producer connected'));
