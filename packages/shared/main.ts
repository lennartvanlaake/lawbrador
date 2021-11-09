import nano from 'nano';

// DB stuff
const con = nano('http://admin:admin@localhost:5984');
con.db
	.create('messages')
	.then((m: any) => console.log(m))
	.catch((e: any) => console.error(e));

export const messageDB = con.use('messages');
// Kafka stuff
export const MESSAGE_TOPIC = 'messages';

// Types
export interface TextMessage {
	message: string;
}
