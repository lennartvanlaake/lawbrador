import { split } from '@legalthingy/parse/src/splitter';
import { map } from '@legalthingy/parse/src/mapper';
import { eurlexHtml } from '../../fixtures/fixtures';
import * as EurlexHtmlConfig from '@legalthingy/parse/src/eurlex/ecj_html';

describe('Test mapper', () => {
	it('check mapping eurlex html', () => {
		const result = split(
			eurlexHtml,
			EurlexHtmlConfig.EurlexECJInfo,
		);
		const mapResult = map(result, EurlexHtmlConfig.EurlexECJInfo);
		console.log(mapResult);
		expect(result.children.length).to.gt(100);
	});
});
