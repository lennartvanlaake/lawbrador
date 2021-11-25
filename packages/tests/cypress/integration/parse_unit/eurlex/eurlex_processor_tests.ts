import { split } from '@legalthingy/parse/src/splitter';
import { map } from '@legalthingy/parse/src/mapper';
import { buildDocument } from '@legalthingy/parse/src/document_factory';
import { eurlexHtml } from '../../../fixtures/fixtures';
import * as EurlexHtmlConfig from '@legalthingy/parse/src/eurlex/ecj_html';

describe('Test mapper', () => {
	it('check mapping eurlex html', () => {
		const result = split(
			eurlexHtml,
			EurlexHtmlConfig.EurlexECJInfo,
		);
		const mapResult = map(result, EurlexHtmlConfig.EurlexECJInfo);
		const doc = buildDocument(
			mapResult,
			EurlexHtmlConfig.EurlexECJInfo,
			eurlexHtml,
			'',
		);
		console.log(doc);
		expect(doc.paragraphs).to.gt(0);
	});
});
