import type { UrlComponent, UrlConfig } from '..';
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
	//@ts-ignore
	const renderedPath = config.pathComponents.reduce((acc, curr: UrlComponent): string => {
		const separator = acc.length == 0 ? '' : '/';
		if ("value" in curr) {
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

	const renderedQueryString = config.queryComponents.reduce((acc, param) => {
			const key = param.name;
			const component = param.urlComponent;
			const separator = acc.length == 0 ? '' : '&';
			if ("value" in component) {
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

export function extractUrlVariables(url: string, config: UrlConfig): Record<string, string>  {
	const output = {};
	const parsedUrl = new URL(url);
	const pathArray = parsedUrl.pathname
		.split('/')
		.filter((it) => it.length > 0)
		.map((it) => decodeURIComponent(it));
	config.pathComponents.forEach((component, i) => {
		if ("variableName" in component) {
			output[component.variableName] = pathArray[i];
		}
	});
	config.queryComponents.forEach((param) => {
		const component = param.urlComponent;
		if ("variableName" in component) {
			const variableValue = parsedUrl.searchParams.get(param.name);
			if (variableValue) {
				output[component.variableName] = variableValue;
			}
		}
	});
	return output;
}
