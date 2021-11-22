import { DocumentUploadInfo } from 'packages/shared/types';
import { split } from './splitter';
import { determine } from './determinator';
import { map } from './mapper';
import axios from 'axios';

export async function process(url: string, inputInfo?: DocumentUploadInfo) {
	const response = await axios.get(url);
	const info = inputInfo ?? determine(url);
	const splitResult = split(response.data, info);
	return map(splitResult, info);
}
