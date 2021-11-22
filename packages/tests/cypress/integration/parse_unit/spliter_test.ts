import { split } from '@legalthingy/parse/src/splitter';
import { eurlexHtml } from '../../fixtures/fixtures';
import * as EurlexHtmlConfig from '@legalthingy/parse/src/eurlex/ecj_html';

describe('Test splitter', () => {
	it('check splitting eurlex html', () => {
		const result = split(
			eurlexHtml,
			EurlexHtmlConfig.EurlexECJInfo,
		);
		console.log(result);
		expect(result.length).to.gt(100);
	});
});
