import { split } from '@legalthingy/parse/src/splitter';
import { map } from '@legalthingy/parse/src/mapper';

import * as EurlexHtmlConfig from '@legalthingy/parse/src/eurlex/ecj_html';
const testString = 'bladiebla';
const testString2 = 'doobiedoo';
const preSign = '-';
const testCount = '1';
function process(html: string) {
	const result = split(
		`<body>${html}</body`,
		EurlexHtmlConfig.EurlexECJInfo,
	);
	return map(result, EurlexHtmlConfig.EurlexECJInfo);
}

describe('Test Eurlex HTML rules', () => {
	it('handle normal paragraph', () => {
		const result = process(`<p class="normal">${testString}</p>`);
		expect(result[0].text).to.eq(testString);
		expect(result[0].type).to.eq('paragraph');
	});
	it('extract indent sign', () => {
		const result = process(`
	      <table>
		 <tr>
		    <td valign="top"  >
		       <p class="count">${preSign}</p>
		    </td>
		    <td valign="top"  >
		       <p class="normal">${testString}</p>
		    </td>
		 </tr>
	      </table>
	`);
		expect(result[0].text).to.eq(testString);
		expect(result[0].pre).to.eq('-');
		expect(result[0].count).to.eq(undefined);
	});
	it('extract paragraph count', () => {
		const result = process(`
	      <table>
		 <tr>
		    <td valign="top"  >
		       <p class="count">${testCount}</p>
		    </td>
		    <td valign="top"  >
		       <p class="normal">${testString}</p>
		    </td>
		 </tr>
	      </table>
	`);
		console.log(result);
		expect(result[0].text).to.eq(testString);
		expect(result[0].pre).to.eq(undefined);
		expect(result[0].count).to.eq(testCount);
	});
	it('ignore unspecified elements', () => {
		const result = process(`<button>${testString}</button>`);
		expect(result.length).to.eq(0);
	});
});

describe('Test Eurlex ECJ rules', () => {
	it('handle title', () => {
		const result = process(
			`<p class="sum-title-1">${testString}</p>`,
		);
		expect(result[0].text).to.eq(testString);
		expect(result[0].type).to.eq('title');
	});
	it('add title to paragraph after title', () => {
		const result = process(
			`<p class="sum-title-1">${testString}</p><p class="normal">${testString2}</p>`,
		);
		expect(result[1].header).to.eq(testString);
	});
});
