import { consumer } from './kafka.js';
import { MESSAGE_TOPIC, messageDB } from '@legalthingy/shared';

consumer.subscribe({ topic: MESSAGE_TOPIC, fromBeginning: true });
consumer.run({
	eachMessage: async (message) => {
		console.log(message);
		const messageText = message.message.value ?? 'doek';
		const doc: any = { message: messageText };
		await messageDB.insert(doc);
	},
});
