import { UriConfig } from '@legalthingy/shared/schemas/rules';

export function last(array: any[]) {
	return array[array.length - 1];
}

export function buildUrl(variables: any, config: UriConfig) {
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

	return `${config.base}/${renderedPath}?${renderedQueryString}`;
}

export function extractUrlVariables(url: string, config: UriConfig): any {
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
			const variableValue = parsedUrl.searchParams.get(
				component.value,
			);
			if (variableValue) {
				output[component.value] = variableValue;
			}
		}
	});
	return output;
}
