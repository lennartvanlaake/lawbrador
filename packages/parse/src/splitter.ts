import { DocumentUploadInfo } from '@legalthingy/shared/types';
import turndown from 'turndown';

export function split(text: string, info: DocumentUploadInfo): string[] {
	if (info.dataType == 'html') {
		const markdown = new turndown().turndown(text);
		return markdown.split('\n');
	} else {
		throw new Error(
			`Upload with data: ${JSON.stringify(
				info,
			)} not supported`,
		);
	}
}
