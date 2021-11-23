import { DocumentUploadInfo } from '@legalthingy/shared/types';
import { Matcher } from '../determinator';
import { MappingRuleset } from '../mapper';
import turndown from 'turndown';

const turndownService = new turndown();

export const EurlexECJInfo: DocumentUploadInfo = {
	name: 'eurlex_ecj',
	dataType: 'html',
	documentType: 'judgement',
	jurisdiction: 'EU',
};

export const matcher: Matcher = (url) => {
	if (
		url.includes('eur-lex') &&
		url.includes('HTML') &&
		url.includes('CJ')
	) {
		return EurlexECJInfo;
	}
	return false;
};

export const ruleset: MappingRuleset = {
	condition: (info) => {
		return info.name == 'eurlex_ecj';
	},
	rules: [
		{
			condition: (el) =>
				el.name == 'p' &&
				el.attribs['class'].includes('title'),
			action: (el, ctx) => {
				const text = turndownService.turndown(
					ctx.$(el).html(),
				);
				ctx.result.push({
					text: text,
					type: 'title',
				});
				ctx.currentHeader = text;
			},
		},
	],
};
