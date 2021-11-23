import { DocumentUploadInfo } from 'packages/shared/types';
import { split } from './splitter';
import { determine } from './determinator';
import { map } from './mapper';
import { buildDocument } from './document_factory';
import axios from 'axios';

export async function process(url: string, inputInfo?: DocumentUploadInfo) {
	const response = await axios.get(url);
	const info = inputInfo ?? determine(url);
	const splitResult = split(response.data, info);
	const paragraphs = map(splitResult, info);
	return buildDocument(paragraphs, info, response.data, url);
}
