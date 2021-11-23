import { MappingRuleset } from '../mapper';
import turndown from 'turndown';

const numberRegex = /^\d+$/
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
			condition: (el) => el.name == 'table',
			action: (el, ctx) => {
				const pre = ctx.$(el).find('.count').html();
				ctx.result.push({
					text: turndownService.turndown(
						ctx
							.$(el)
							.find('.normal')
							.html(),
					),
					count: numberRegex.test(pre) ? pre: undefined,
					pre: !numberRegex.test(pre) ? pre: undefined,
					type: 'paragraph',
					header: ctx.currentHeader,
				});
			}
		}

	],
};
