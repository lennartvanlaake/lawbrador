import { determine } from '../determinator';

test('Can determine ECJ Eurlex HTML', () => {
	const url =
		'https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:62017CJ0699&from=EN';
	const result = determine(url);
	expect(result.name).toBe('eurlex_ecj');
});

test('Throws on unknown URL', () => {
	const url = 'https://blaaaaaaaaaa';
	expect(() => determine(url)).toThrow();
});
