import { DocumentUploadInfo } from '@legalthingy/shared/types';
import * as EcjHtml from './eurlex/ecj_html';

export interface Matcher {
	(url: string): DocumentUploadInfo | false;
}

const matchers: Matcher[] = [];

matchers.push(EcjHtml.matcher);

export function determine(url: string) {
	for (let i = 0; i < matchers.length; i++) {
		const matcher = matchers[i];
		const result = matcher(url);
		if (result) {
			return result;
		}
	}

	throw Error('Document upload not supported');
}
