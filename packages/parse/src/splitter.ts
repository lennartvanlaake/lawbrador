import { DocumentUploadInfo } from '@legalthingy/shared/types';
import cheerio, { Cheerio, Element, CheerioAPI } from 'cheerio';

export interface SplitResult {
	children: Cheerio<Element>;
	$: CheerioAPI;
}

export function split(text: string, info: DocumentUploadInfo): SplitResult {
	if (info.dataType == 'html' && info.jurisdiction == 'EU') {
		const $ = cheerio.load(text);
		const children = $('body').children();
		return { children: children, $: $ };
	} else {
		throw new Error(
			`Upload with data: ${JSON.stringify(
				info,
			)} not supported`,
		);
	}
}
