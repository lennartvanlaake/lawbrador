import type { UrlComponent, UrlConfig } from "..";
import { Md5 } from "md5-typescript";
import type { SearchUrlConfig } from "../schemas/ruleTypes";
import { PAGE_VARIABLE_NAME, QUERY_VARIABLE_NAME } from "../constants/other";
import { parse } from "../parse/scraper";
function hash(str: string): string {
  return Md5.init(str);
}

export function hashObject(obj: any) {
  return hash(JSON.stringify(obj));
}
export function hashUrlVariables(variables: any, config: UrlConfig) {
  return hashObject(extractUrlVariables(variables, config));
}
export function buildUrl(
  variables: Record<string, string>,
  config: UrlConfig | SearchUrlConfig
) {
  //@ts-ignore
  const renderedPath = config.pathComponents.reduce(
    (acc, curr: UrlComponent): string => {
      const separator = acc.length == 0 ? "" : "/";
      if ("value" in curr) {
        return `${acc}${separator}${curr.value}`;
      } else if (!variables[curr.variableName]) {
        throw new Error(
          `required path varaible ${curr.variableName} not provided`
        );
      } else {
        return `${acc}${separator}${encodeURIComponent(
          variables[curr.variableName]
        )}`;
      }
    },
    ""
  );
  if ("queryVariable" in config) {
    const searchConfig = config as SearchUrlConfig;
    config.queryComponents.push({
      name: searchConfig.queryVariable,
      urlComponent: {
        variableName: QUERY_VARIABLE_NAME,
      },
    });
    const pageVariable = searchConfig.pageVariable;
    if (pageVariable) {
      config.queryComponents.push({
        name: pageVariable,
        urlComponent: {
          variableName: PAGE_VARIABLE_NAME,
        },
      });
    }
  }

  const renderedQueryString = config.queryComponents.reduce((acc, param) => {
    const key = param.name;
    const component = param.urlComponent;
    const separator = acc.length == 0 ? "" : "&";
    if ("value" in component) {
      return `${acc}${separator}${key}=${component.value}`;
    } else if (!variables[component.variableName]) {
      // skip empty query params
      return acc;
    } else {
      return `${acc}${separator}${key}=${encodeURIComponent(
        variables[component.variableName]
      )}`;
    }
  }, "");
  const pathSeparator = renderedPath.length > 0 ? "/" : "";
  const querySeparator = renderedQueryString.length > 0 ? "?" : "";
  return `${config.base}${pathSeparator}${renderedPath}${querySeparator}${renderedQueryString}`;
}

export function extractUrlVariables(
  url: string,
  config: UrlConfig
): Record<string, string> {
  const output = {};
  const parsedUrl = new URL(url);
  const pathArray = parsedUrl.pathname
    .split("/")
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

  if ("queryVariable" in config) {
    const searchConfig = config as SearchUrlConfig;
    output[QUERY_VARIABLE_NAME] = parsedUrl.searchParams.get(
      searchConfig.queryVariable
    );
    let pageValue: string | undefined | null;
    if (searchConfig.pageVariable) {
      pageValue = parsedUrl.searchParams.get(searchConfig.pageVariable);
    }
    if (pageValue) {
      output[PAGE_VARIABLE_NAME] = pageValue;
    }
  }
  return output;
}

export function makeLinkAbsolute(link: string, base: string) {
  if (link.indexOf("http://") === 0 || link.indexOf("https://") === 0) {
    return link;
  } else {
    const url = new URL(link, base);
    return url.toString();
  }
}
