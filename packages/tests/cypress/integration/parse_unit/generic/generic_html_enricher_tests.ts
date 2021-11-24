import { buildDocument } from '@legalthingy/parse/src/document_factory';

import * as EurlexHtmlConfig from '@legalthingy/parse/src/eurlex/ecj_html';
function process(paragraphs: any[], raw = '', source = '') {
	return buildDocument(
		paragraphs,
		EurlexHtmlConfig.EurlexECJInfo,
		raw,
		source,
	);
}

describe('Test adding markers', () => {
	it('Add marker for unordened list', () => {
		const doc = process([
			{
				type: 'paragaph',
				pre: '-',
			},
		]);
		expect(doc.paragraphs[0].subtype).to.eq('ul_start');
		expect(doc.paragraphs[2].subtype).to.eq('ul_end');
	});
});
