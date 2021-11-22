import { MappingRuleset } from '../mapper';
import turndown from 'turndown';

const turndownService = new turndown();
export const ruleset: MappingRuleset = {
	condition: (info) => {
		return info.jurisdiction == 'EU' && info.dataType == 'html';
	},
	rules: [
		{
			condition: (el) =>
				el.name == 'p' &&
				el.attribs['class'] == 'normal',
			action: (el, ctx) =>
				ctx.result.push({
					text: turndownService.turndown(
						ctx.$(el).html(),
					),
					type: 'intro',
				}),
		},
		{
			condition: (el) =>
				el.name == 'p' &&
				el.attribs['class'].includes('title'),
			action: (el, ctx) =>
				ctx.result.push({
					text: turndownService.turndown(
						ctx.$(el).html(),
					),
					type: 'title',
				}),
		},
	],
};
