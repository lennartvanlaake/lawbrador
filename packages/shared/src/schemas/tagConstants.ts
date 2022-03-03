import type { TagConfig, TagName } from "./tagTypes";

export const ALL_TAGS: readonly TagConfig[] = [
  {
    name: "p",
    default: true,
    type: "paragraph",
  },
  {
    name: "h1",
    default: false,
    type: "paragraph",
  },
  {
    name: "h2",
    default: false,
    type: "paragraph",
  },
  {
    name: "h3",
    default: false,
    type: "paragraph",
  },
  {
    name: "li",
    default: true,
    type: "paragraph",
  },
  {
    name: "div",
    default: true,
    type: "container",
  },
  {
    name: "ol",
    default: true,
    type: "container",
  },
  {
    name: "a",
    default: true,
    type: "inline",
  },
  {
    name: "inline",
    default: false,
    type: "inline",
  },
  {
    name: "text",
    default: true,
    type: "text",
  },
  {
    name: "hidden",
    default: false,
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

export const ALL_CONTAINER_TAGS = ALL_TAGS.filter((it) => it.type == "container").map(
  (it) => it.name
);

export const ALL_PARAGRAPH_TAGS = ALL_TAGS.filter((it) => it.type == "paragraph").map(
  (it) => it.name
);

export const ALL_MARKUP_NOTATIONS = ALL_TAGS.filter((it) => !it.default).map(
  (it) => it.name
);

export const ALL_TAG_NAMES = ALL_TAGS.map(
  (it) => it.name
);
