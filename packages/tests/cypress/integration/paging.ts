import { incrementPageNumber } from '@legalthingy/parse/src/searcher';
import { HtmlSearchRuleSet } from '@legalthingy/shared/schemas/rules';

const config: HtmlSearchRuleSet = {
	pageVariable: 'page',
	queryVariable: '',
	resultListRule: {
		op: 'is',
		location: 'class',
		value: '',
	},
	resultRule: {
		op: 'is',
		location: 'class',
		value: '',
	},
	resultLinkRule: {
		op: 'is',
		location: 'tag',
		value: '',
	},
};

describe('Incrementing the page number', () => {
	it('goes to the second page if no page number is provided', () => {
		const result = incrementPageNumber({}, config);
		expect(result[config.pageVariable]).to.eq('2');
	});
	it('goes to the third page if page number 2 is provided', () => {
		const result = incrementPageNumber({ page: '2' }, config);
		expect(result[config.pageVariable]).to.eq('3');
	});
	it('throws if a non-numeric page number is provided', () => {
		expect(() => incrementPageNumber({ page: 'blabla' }, config)).to
			.throw;
	});
});
