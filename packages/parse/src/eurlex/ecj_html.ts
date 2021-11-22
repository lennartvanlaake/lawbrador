import { DocumentUploadInfo } from '@legalthingy/shared/types';
import { Matcher } from '../determinator';

export const EurlexECJInfo: DocumentUploadInfo = {
	name: 'eurlex_ecj',
	dataType: 'html',
	documentType: 'judgement',
	jurisdiction: 'EU',
};

export const matcher: Matcher = (url) => {
	if (
		url.includes('eur-lex') &&
		url.includes('HTML') &&
		url.includes('CJ')
	) {
		return EurlexECJInfo;
	}
	return false;
};
