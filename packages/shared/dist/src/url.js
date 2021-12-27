"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUrlVariables = exports.buildUrl = exports.hashUrlVariables = exports.hashObject = void 0;
const md5_typescript_1 = require("md5-typescript");
function hash(str) {
    return md5_typescript_1.Md5.init(str);
}
function hashObject(obj) {
    return hash(JSON.stringify(obj));
}
exports.hashObject = hashObject;
function hashUrlVariables(variables, config) {
    return hashObject(extractUrlVariables(variables, config));
}
exports.hashUrlVariables = hashUrlVariables;
function buildUrl(variables, config) {
    const renderedPath = config.pathComponents.reduce((acc, curr) => {
        const separator = acc.length == 0 ? '' : '/';
        if (curr.value) {
            return `${acc}${separator}${curr.value}`;
        }
        else if (!variables[curr.variableName]) {
            throw new Error(`required path varaible ${curr.variableName} not provided`);
        }
        else {
            return `${acc}${separator}${encodeURIComponent(variables[curr.variableName])}`;
        }
    }, '');
    const renderedQueryString = Object.keys(config.queryComponents).reduce((acc, key) => {
        const separator = acc.length == 0 ? '' : '&';
        const component = config.queryComponents[key];
        if (component.value) {
            return `${acc}${separator}${key}=${component.value}`;
        }
        else if (!variables[component.variableName]) {
            // skip empty query params
            return acc;
        }
        else {
            return `${acc}${separator}${key}=${encodeURIComponent(variables[component.variableName])}`;
        }
    }, '');
    const pathSeparator = renderedPath.length > 0 ? '/' : '';
    const querySeparator = renderedQueryString.length > 0 ? '?' : '';
    return `${config.base}${pathSeparator}${renderedPath}${querySeparator}${renderedQueryString}`;
}
exports.buildUrl = buildUrl;
function extractUrlVariables(url, config) {
    const output = {};
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
exports.extractUrlVariables = extractUrlVariables;
//# sourceMappingURL=url.js.map