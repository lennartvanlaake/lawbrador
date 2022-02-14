import { TagConfig, TagName } from "./tagTypes";

export const ALL_TAGS: readonly TagConfig[] = [
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
    name: "a",
    default: true,
    modifies: false,
    type: "inline",
  },
  {
    name: "li-marker",
    default: false,
    modifies: true,
    type: "inline",
  },
  {
    name: "text",
    default: true,
    modifies: false,
    type: "text",
  },
  {
    name: "hidden",
    default: false,
    modifies: false,
    type: "hidden",
  },
] as const;

const configMap = ALL_TAGS.reduce((p, c) => {
  p[c.name] = c;
  return p;
}, {} as Record<TagName, TagConfig>);

export function getTagConfig(name: TagName): TagConfig {
  return configMap[name];
}

export const ALL_MARKUP_NOTATIONS = ALL_TAGS.filter((it) => !it.default).map(
  (it) => it.name
);

export const ALL_TAG_NAMES = ALL_TAGS.map(
  (it) => it.name
);
