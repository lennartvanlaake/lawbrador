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
	it('Add to unordened list', () => {
		const doc = process([
			{
				type: 'paragaph',
				pre: '-',
			},
		]);
		expect(doc.paragraphs[0].subtype).to.eq('ul');
		expect(doc.paragraphs[0].children.length).to.eq(1);
	});
	it('Add to ordened list', () => {
		const doc = process([
			{
				type: 'paragraph',
				count: '1',
			},
		]);
		expect(doc.paragraphs[0].subtype).to.eq('ol');
		expect(doc.paragraphs[0].children.length).to.eq(1);
	});
	it('Add ordened list after unordened', () => {
		const doc = process([
			{
				type: 'paragaph',
				pre: '-',
			},
			{
				type: 'paragaph',
				count: '1',
				pre: '1',
			},
			{
				type: 'paragaph',
			},
		]);
		expect(doc.paragraphs[0].subtype).to.eq('ul');
		expect(doc.paragraphs[1].subtype).to.eq('ol');
		expect(doc.paragraphs[1].type).to.eq('paragraph');
		expect(doc.paragraphs[1].children.length).to.eq(1);
	});
});
