import { messageDB } from '@legalthingy/shared';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const messages = await messageDB.list();
	const rows: any = messages.rows;
	//const messageIds: string[] = messages.rows.map((m) => m.id);
	//const messageValues: any = await messageDB.bulk({ docs: messageIds });
	//console.log('changed');
	//console.log(messageValues);
	return {
		body: rows
	};
};
