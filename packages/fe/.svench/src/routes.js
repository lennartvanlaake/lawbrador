const f /* files */ = [
  { // f[0]
    path: "/svench/config/DocumentRuleset",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/svench/config/DocumentRuleset.svench"),
    "id": "1inwo2c",
    "ext": ".svench",
    "dir": "svench/config",
    "segment": "DocumentRuleset",
    "sortKey": "DocumentRuleset",
    "title": "DocumentRuleset",
    "canonical": "/svench/config/DocumentRuleset",
    "options": {},
    "views": [
      "Empty",
      "Eurlex 1",
      "Invalid"
    ],
    "headings": []
  },
  { // f[1]
    path: "/svench/config/RuleConfig",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/svench/config/RuleConfig.svench"),
    "id": "r24b87",
    "ext": ".svench",
    "dir": "svench/config",
    "segment": "RuleConfig",
    "sortKey": "RuleConfig",
    "title": "RuleConfig",
    "canonical": "/svench/config/RuleConfig",
    "options": {},
    "views": [
      "empty",
      "filled"
    ],
    "headings": []
  },
  { // f[2]
    path: "/svench/config/SourceConfig",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/svench/config/SourceConfig.svench"),
    "id": "tzhrfk",
    "ext": ".svench",
    "dir": "svench/config",
    "segment": "SourceConfig",
    "sortKey": "SourceConfig",
    "title": "SourceConfig",
    "canonical": "/svench/config/SourceConfig",
    "options": {},
    "views": [
      "Empty",
      "Eurlex"
    ],
    "headings": []
  },
  { // f[3]
    path: "/svench/config/UrlComponent",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/svench/config/UrlComponent.svench"),
    "id": "1n005mr",
    "ext": ".svench",
    "dir": "svench/config",
    "segment": "UrlComponent",
    "sortKey": "UrlComponent",
    "title": "UrlComponent",
    "canonical": "/svench/config/UrlComponent",
    "options": {},
    "views": [
      "static",
      "variable",
      "variable with options",
      "empty static",
      "empty variable",
      "variable with empty options"
    ],
    "headings": []
  },
  { // f[4]
    path: "/svench/config/UrlConfig",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/svench/config/UrlConfig.svench"),
    "id": "1zk3ce",
    "ext": ".svench",
    "dir": "svench/config",
    "segment": "UrlConfig",
    "sortKey": "UrlConfig",
    "title": "UrlConfig",
    "canonical": "/svench/config/UrlConfig",
    "options": {},
    "views": [
      "Empty",
      "Eurlex search",
      "Eurlex search with invalid url"
    ],
    "headings": []
  },
  { // f[5]
    path: "/svench/page/SourceConfigEditor",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/svench/page/SourceConfigEditor.svench"),
    "id": "b83lhq",
    "ext": ".svench",
    "dir": "svench/page",
    "segment": "SourceConfigEditor",
    "sortKey": "SourceConfigEditor",
    "title": "SourceConfigEditor",
    "canonical": "/svench/page/SourceConfigEditor",
    "options": {},
    "views": [
      "Empty",
      "Eurlex"
    ],
    "headings": []
  },
  { // f[6]
    path: "/svench/search/SourceConfigSelector",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/svench/search/SourceConfigSelector.svench"),
    "id": "1213v37",
    "ext": ".svench",
    "dir": "svench/search",
    "segment": "SourceConfigSelector",
    "sortKey": "SourceConfigSelector",
    "title": "SourceConfigSelector",
    "canonical": "/svench/search/SourceConfigSelector",
    "options": {},
    "views": [
      "empty",
      "filled"
    ],
    "headings": []
  },
  { // f[7]
    path: "/svench/view/NodeView",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/svench/view/NodeView.svench"),
    "id": "1ue88xr",
    "ext": ".svench",
    "dir": "svench/view",
    "segment": "NodeView",
    "sortKey": "NodeView",
    "title": "NodeView",
    "canonical": "/svench/view/NodeView",
    "options": {},
    "views": [
      "name only node",
      "name only node in paragraph",
      "two named only nodes"
    ],
    "headings": []
  }
]

const d /* dirs */ = [
  { // d[0]
    path: "/svench/config",
    "id": "2omlb0",
    "ext": undefined,
    "dir": "svench",
    "segment": "config",
    "sortKey": "config",
    "title": "config",
    "canonical": "/svench/config",
    children: () => [f[0], f[1], f[2], f[3], f[4]]
  },
  { // d[1]
    path: "/svench/page",
    "id": "15mmdjh",
    "ext": undefined,
    "dir": "svench",
    "segment": "page",
    "sortKey": "page",
    "title": "page",
    "canonical": "/svench/page",
    children: () => [f[5]]
  },
  { // d[2]
    path: "/svench/search",
    "id": "mugowe",
    "ext": undefined,
    "dir": "svench",
    "segment": "search",
    "sortKey": "search",
    "title": "search",
    "canonical": "/svench/search",
    children: () => [f[6]]
  },
  { // d[3]
    path: "/svench/view",
    "id": "17o9sy7",
    "ext": undefined,
    "dir": "svench",
    "segment": "view",
    "sortKey": "view",
    "title": "view",
    "canonical": "/svench/view",
    children: () => [f[7]]
  },
  { // d[4]
    path: "/svench",
    "id": "57cs3x",
    "ext": undefined,
    "dir": ".",
    "segment": "svench",
    "sortKey": "svench",
    "title": "svench",
    "canonical": "/svench",
    children: () => [d[0], d[1], d[2], d[3]]
  }
]

for (const g of [f, d])
  for (const x of g) x.children = x.children ? x.children() : []

const routes = [...f, ...d]

const tree = {
  path: "/",
  isRoot: true,
  "id": undefined,
  "ext": undefined,
  "dir": undefined,
  "segment": undefined,
  "sortKey": undefined,
  "title": undefined,
  "canonical": undefined,
  children: [
    d[4]
  ]
}

export { f as files, d as dirs, routes, tree }
