import { parse } from './processor';

const args = process.argv.slice(2);

args.forEach(async (url) => {
	const result = await parse(url, null);
	console.log(result);
});
