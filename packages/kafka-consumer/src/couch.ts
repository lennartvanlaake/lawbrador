import nano from 'nano';
const con = nano('http://admin:admin@localhost:5984');

con.db
	.create('messages')
	.then((m: any) => console.log(m))
	.catch((e: any) => console.error(e));

export const messageDB = con.use('messages');
