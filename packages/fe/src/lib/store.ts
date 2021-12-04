import type { SourceSiteConfig } from '@legalthingy/shared/schemas/rules';

//import type { ParsedNode } from '@legalthingy/shared/schemas/document_version';
function get(key: string): any {
	return JSON.parse(localStorage.getItem(key));
}
function set(key: string, value: any) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function setSourceConfig(config: SourceSiteConfig) {
	set('sourceConfig', config);
}
export function getSourceConfig(): SourceSiteConfig {
	return get('sourceConfig');
}

export function setCurrentResult(result: any) {
	return set('currentResult', result);
}
export function getCurrentResult(): any {
	return get('currentResult');
}

export function setResultList(resultList: any) {
	return set('resultList', resultList);
}
export function getResultList(): any {
	return get('resultList');
}
