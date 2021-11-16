import { Kafka } from 'kafkajs';

const kafka = new Kafka({
	clientId: 'producer',
	brokers: ['localhost:9092'],
});

export const producer = kafka.producer();

producer.connect().then(() => console.log('producer connected'));
