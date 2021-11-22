import { DocumentUploadInfo } from 'packages/shared/types';
import { split } from './splitter';
import { determine } from './determinator';
import axios from 'axios';

export async function parse(url: string, inputInfo?: DocumentUploadInfo) {
	const response = await axios.get(url);
	const info = inputInfo ?? determine(url);
	return await split(response.data, info);
}
