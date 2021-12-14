import { UrlConfig } from '@legalthingy/shared/schemas/rules';
import { Md5 } from 'md5-typescript';
function hash(str: string): string {
	return Md5.init(str);
}

export function hashObject(obj: any) {
	return hash(JSON.stringify(obj));
}
export function hashUrlVariables(variables: any, config: UrlConfig) {
	return hashObject(extractUrlVariables(variables, config));
}
export function buildUrl(variables: Record<string, string>, config: UrlConfig) {
	const renderedPath = config.pathComponents.reduce((acc, curr) => {
		const separator = acc.length == 0 ? '' : '/';
		if (curr.value) {
			return `${acc}${separator}${curr.value}`;
		} else if (!variables[curr.variableName]) {
			throw new Error(
				`required path varaible ${curr.variableName} not provided`,
			);
		} else {
			return `${acc}${separator}${encodeURIComponent(
				variables[curr.variableName],
			)}`;
		}
	}, '');

	const renderedQueryString = Object.keys(config.queryComponents).reduce(
		(acc, key) => {
			const separator = acc.length == 0 ? '' : '&';
			const component = config.queryComponents[key];
			if (component.value) {
				return `${acc}${separator}${key}=${component.value}`;
			} else if (!variables[component.variableName]) {
				// skip empty query params
				return acc;
			} else {
				return `${acc}${separator}${key}=${encodeURIComponent(
					variables[component.variableName],
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
		if (!component.value) {
			output[component.variableName] = pathArray[i];
		}
	});
	Object.keys(config.queryComponents).forEach((key) => {
		const component = config.queryComponents[key];
		if (!component.value) {
			const variableValue = parsedUrl.searchParams.get(key);
			if (variableValue) {
				output[component.variableName] = variableValue;
			}
		}
	});
	return output;
}
