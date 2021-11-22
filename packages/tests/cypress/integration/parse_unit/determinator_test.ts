import { determine } from '@legalthingy/parse/src/determinator';

describe('Testing determing', () => {
	it('Recognizes a eur-lex html url', () => {
		const url =
			'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:62017CJ0699&from=EN';
		const result = determine(url);
		expect(result.name).to.equal('eurlex_ecj');
	});
	it('Throws on unknown URL', () => {
		const url = 'https://blaaaaaaaaaa';
		expect(() => determine(url)).to.throw();
	});
});
