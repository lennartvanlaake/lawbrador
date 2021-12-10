import { UrlConfig } from '@legalthingy/shared/schemas/rules';
import Hashes from 'jshashes';

const sha1 = new Hashes.SHA1();

export function last(array: any[]) {
	return array[array.length - 1];
}

export function hash(str: string): string {
	return sha1.hex(str);
}

export function hashObject(obj: any) {
	return sha1.hex(JSON.stringify(obj));
}

export function hashUrlVariables(variables: any, config: UrlConfig) {
	return hashObject(extractUrlVariables(variables, config));
}

export function buildUrl(variables: Record<string, string>, config: UrlConfig) {
	const renderedPath = config.pathComponents.reduce((acc, curr) => {
		const separator = acc.length == 0 ? '' : '/';
		if (curr.static) {
			return `${acc}${separator}${curr.value}`;
		} else if (!variables[curr.value]) {
			throw new Error(
				`required path varaible ${curr.value} not provided`,
			);
		} else {
			return `${acc}${separator}${encodeURIComponent(
				variables[curr.value],
			)}`;
		}
	}, '');

	const renderedQueryString = Object.keys(config.queryComponents).reduce(
		(acc, key) => {
			const separator = acc.length == 0 ? '' : '&';
			const component = config.queryComponents[key];
			if (component.static) {
				return `${acc}${separator}${key}=${component.value}`;
			} else if (!variables[component.value]) {
				// skip empty query params
				return acc;
			} else {
				return `${acc}${separator}${key}=${encodeURIComponent(
					variables[component.value],
				)}`;
			}
		},
		'',
	);
	const pathSeparator = renderedPath.length > 0 ? '/' : '';
	const querySeparator = renderedQueryString.length > 0 ? '?' : '';
	return `${config.base}${pathSeparator}${renderedPath}${querySeparator}${renderedQueryString}`;
}

export function extractUrlVariables(url: string, config: UrlConfig): any {
	const output: any = {};
	const parsedUrl = new URL(url);
	const pathArray = parsedUrl.pathname
		.split('/')
		.filter((it) => it.length > 0)
		.map((it) => decodeURIComponent(it));
	config.pathComponents.forEach((component, i) => {
		if (!component.static) {
			output[component.value] = pathArray[i];
		}
	});
	Object.keys(config.queryComponents).forEach((key) => {
		const component = config.queryComponents[key];
		if (!component.static) {
			const variableValue = parsedUrl.searchParams.get(key);
			if (variableValue) {
				output[component.value] = variableValue;
			}
		}
	});
	return output;
}
