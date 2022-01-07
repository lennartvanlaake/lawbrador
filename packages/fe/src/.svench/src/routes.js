const f /* files */ = [
  { // f[0]
    path: "/Hi",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/Hi.svench"),
    "id": "129hi7p",
    "ext": ".svench",
    "dir": "",
    "segment": "Hi",
    "sortKey": "Hi",
    "title": "Hi",
    "canonical": "/Hi",
    "options": {},
    "views": [],
    "headings": []
  },
  { // f[1]
    path: "/hello",
    import: () => import("/home/lennart/lawbrador/packages/fe/src/hello.md"),
    "id": "oa84tm",
    "ext": ".md",
    "dir": "",
    "segment": "hello",
    "sortKey": "hello",
    "title": "hello.md",
    "canonical": "/hello",
    "options": {},
    "views": [],
    "headings": [
      {
        "level": 1,
        "hierarchy": [
          "Hello"
        ],
        "text": "Hello",
        "id": "hello"
      }
    ]
  }
]

const d /* dirs */ = []

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
    f[0],
    f[1]
  ]
}

export { f as files, d as dirs, routes, tree }
