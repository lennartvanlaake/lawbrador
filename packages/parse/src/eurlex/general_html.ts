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
					type: 'paragraph',
					header: ctx.currentHeader,
				}),
		},
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
		{
			condition: (el) => el.name == 'table',
			action: (el, ctx) =>
				ctx.result.push({
					text: turndownService.turndown(
						ctx
							.$(el)
							.find('.normal')
							.html(),
					),
					pre: ctx.$(el).find('.count').html(),
					type: 'paragraph',
					header: ctx.currentHeader,
				}),
		},
	],
};
