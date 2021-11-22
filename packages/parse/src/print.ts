import { process } from './processor';

const args = process.argv.slice(2);

args.forEach(async (url) => {
	const result = await process(url, null);
	console.log(result);
});
