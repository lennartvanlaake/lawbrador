import type {
  DocumentRuleSet,
  KeyValue,
  MarkupRule,
  QueryParam,
  SelectionRule,
  SourceSiteConfig,
  UrlComponent,
  UrlConfig,
  ValueWithDisplayName,
} from "..";

export const EMPTY_KEY_VALUE: KeyValue = {
  key: "",
  value: "",
};
export const EMPTY_URL_COMPONENT: UrlComponent = {
  value: "",
};
export const EMPTY_QUERY_PARAM: QueryParam = {
  name: "",
  urlComponent: { ...EMPTY_URL_COMPONENT },
};
export const EMPTY_VALUE_WITH_DISPLAY_NAME: ValueWithDisplayName = {
  value: "",
};
export const DEFAULT_EMPTY_SELECTION_RULE: SelectionRule = {
  op: "is",
  location: "id",
  value: "",
};
export const EMPTY_MARKUP_RULE: MarkupRule = {
  tag: "h1",
  filter: { ...DEFAULT_EMPTY_SELECTION_RULE },
};
export const DEFAULT_EMPTY_RULESET: DocumentRuleSet = {
  preserveMarkup: true,
};
export const EMPTY_URL_CONFIG: UrlConfig = {
  base: "https://",
  pathComponents: [],
  queryComponents: [],
};
export const EMPTY_SOURCE_CONFIG: Omit<SourceSiteConfig, "_id"> = {
  name: "",
  searchUrlConfig: {
    queryVariable: "text",
    pageVariable: "page",
    base: "https://",
    pathComponents: [],
    queryComponents: [],
  },
  documentUrlConfig: {
    base: "https://",
    pathComponents: [],
    queryComponents: [],
  },

  documentRuleSets: [],
  htmlSearchRuleSet: {
    resultListRule: {
      ...DEFAULT_EMPTY_SELECTION_RULE,
    },
    resultLinkRule: {
      ...DEFAULT_EMPTY_SELECTION_RULE,
    },
  },
};

// hard coded for now
export const eurlexConfig: SourceSiteConfig = {
  _id: "61de9dc2a2dd97b823d99aea",
  name: "Eurlex",
  searchUrlConfig: {
    queryVariable: "text",
    pageVariable: "page",
    base: "https://eur-lex.europa.eu",
    pathComponents: [
      {
        value: "search.html",
      },
    ],
    queryComponents: [
      {
        name: "scope",
        urlComponent: {
          value: "EURLEX",
        },
      },
      {
        name: "DTS_SUBDOM",
        urlComponent: {
          variableName: "domain",
          possibleValues: [
            {
              value: "LEGISLATION",
              displayName: "Legislation",
            },
            {
              value: "EU_CASE_LAW",
              displayName: "EU case law",
            },
          ],
        },
      },
      {
        name: "type",
        urlComponent: {
          value: "quick",
        },
      },
    ],
  },
  documentUrlConfig: {
    base: "https://eur-lex.europa.eu",
    pathComponents: [
      {
        value: "legal-content",
      },
      {
        value: "AUTO",
      },
    ],
    queryComponents: [
      {
        name: "uri",
        urlComponent: {
          variableName: "celex",
        },
      },
    ],
  },
  documentRuleSets: [
    {
      preserveMarkup: true,
      bodyRule: {
        op: "is",
        location: "id",
        value: "TexteOnly",
      },
    },
    {
      preserveMarkup: true,
      bodyRule: {
        op: "is",
        location: "id",
        value: "textTabContent",
      },
      markupRules: [
        {
          tag: "h1",
          filter: {
            op: "includes",
            location: "class",
            value: "Titre1",
          },
        },
      ],
    },
  ],
  htmlSearchRuleSet: {
    resultListRule: {
      op: "is",
      location: "class",
      value: "EurlexContent",
    },
    resultLinkRule: {
      op: "includes",
      location: "link",
      value: "legal-content/AUTO",
    },
  },
};
