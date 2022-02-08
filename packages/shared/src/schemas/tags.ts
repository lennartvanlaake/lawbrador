import { Type } from "@sinclair/typebox";

export const ALL_TAG_NAMES = ["p", "li", "h1", "h2", "h3", "div", "ol", "text", "a", "li-marker"] as const;

export type TagName = typeof ALL_TAG_NAMES[number];

export const tagName = Type.Union(
  ALL_TAG_NAMES.map((it) => Type.Literal(it))
);

export const ALL_TAGS: readonly TagConfig[] = [
  {
    name: "p",
    default: true,
    modifies: false,
    type: "paragraph",
  },
  {
    name: "p",
    default: true,
    modifies: false,
    type: "paragraph",
  },
  {
    name: "h1",
    default: false,
    modifies: false,
    type: "paragraph",
  },
  {
    name: "h2",
    default: false,
    modifies: false,
    type: "paragraph",
  },
  {
    name: "h3",
    default: false,
    modifies: false,
    type: "paragraph",
  },
  {
    name: "div",
    default: true,
    modifies: false,
    type: "container",
  },
  {
    name: "ol",
    default: true,
    modifies: false,
    type: "container",
  },
  {
    name: "text",
    default: true,
    modifies: false,
    type: "text",
  },
  {
    name: "a",
    default: true,
    modifies: false,
    type: "text",
  },
  {
    name: "li-marker",
    default: false,
    modifies: true,
    type: "text",
  },
] as const;

const configMap = ALL_TAGS.reduce((p, c) => {
  p[c.name] = c;
  return p;
}, {} as Record<TagName, TagConfig>);

export function getTagConfig(name: TagName): TagConfig {
  return configMap[name];
}

export interface TagConfig {
  name: TagName;
  // if true tag is assigned by comes the code, if false it is conferred by a selection rule
  default: boolean;
  // if true the parseing of this tag can restructure the HTML
  modifies: boolean;
  // paragraphs get margins, containers contain multiple paragraphs and text is displayed inline 
  type: "paragraph" | "container" | "text" | "hide";
}

export const ALL_MARKUP_NOTATIONS = ALL_TAGS.filter((it) => !it.default).map(
  (it) => it.name
);

export const markupNotation = Type.Union(
  ALL_MARKUP_NOTATIONS.map((it) => Type.Literal(it))
);
