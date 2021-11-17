import { consumer } from './kafka.js';
import { TEXT_TOPIC } from '@legalthingy/shared/kafka';
import { Text } from '@legalthingy/shared/mongo';

consumer.subscribe({ topic: TEXT_TOPIC, fromBeginning: true });
consumer.run({
	eachMessage: async (message) => {
		console.log(message);
		const messageText = message.message.value ?? 'doek';
});
