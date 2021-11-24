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
	it('Add marker for ordened list', () => {
		const doc = process([
			{
				type: 'paragraph',
				count: '1',
			},
		]);
		expect(doc.paragraphs[0].subtype).to.eq('ol_start');
		expect(doc.paragraphs[2].subtype).to.eq('ol_end');
	});
	it('Add marker for ordened list between other elements', () => {
		const doc = process([
			{
				type: 'paragaph',
			},
			{
				type: 'paragaph',
				count: '1',
			},
			{
				type: 'paragaph',
			},
		]);
		expect(doc.paragraphs[1].subtype).to.eq('ol_start');
		expect(doc.paragraphs[3].subtype).to.eq('ol_end');
	});
});
