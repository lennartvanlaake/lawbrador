import { MappingRuleset } from '../mapper';
import turndown from 'turndown';

const numberRegex = /^\d+$/;
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
			action: (el, ctx) => {
				const html = ctx.$(el).html();
				if (!html) return;
				ctx.result.push({
					text: turndownService.turndown(html),
					type: 'paragraph',
					header: ctx.currentHeader,
				});
			},
		},
		{
			condition: (el) => el.name == 'table',
			action: (el, ctx) => {
				const pre = turndownService.turndown(
					ctx.$(el).find('td').first().html(),
				);
				const html = ctx.$(el).find('td').last().html();
				if (!html) return;
				ctx.result.push({
					text: turndownService.turndown(html),
					count: numberRegex.test(pre)
						? pre
						: undefined,
					pre: pre,
					type: 'paragraph',
					header: ctx.currentHeader,
				});
			},
		},
	],
};
