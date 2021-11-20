import axios from 'axios';
import cheerio, { Element, Cheerio, CheerioAPI } from 'cheerio';
import type { FastifyPluginAsync } from 'fastify';
import type { IdParams } from '@legalthingy/shared/schemas/generic';

function getUrl(celex: string) {
	return `https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:${celex}&from=EN`;
}

function parse(body: Element[], $: CheerioAPI) {
	return body.map((el) => {
		const cheerioElement = $(el);
		console.debug();
		if (el.name == 'p') {
			return {
				text: cheerioElement.text().trim(),
				type: 'paragraph',
			};
		} else if (el.name == 'table') {
			const rows = $('td', cheerioElement);
			return {
				text: $(rows[1]).text().trim(),
				number: $(rows[0]).text().trim(),
				type: 'paragraph',
			};
		}
	});
}
export const scrapeRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get<{ Params: IdParams }>('/api/scrape/eu/:id', async (req) => {
		const celex = req.params.id;
		const body = await axios.get(getUrl(celex));
		const $ = cheerio.load(body.data);
		return parse($('body').children().toArray(), $);
	});
};
