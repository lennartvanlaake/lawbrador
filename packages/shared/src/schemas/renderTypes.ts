interface BaseTagOrText {
  type: TagOrTextType;
  origin: TagOrTextOrigin;
  text: string;
}

type TagOrTextOrigin = "original" | "marker" | "search";

type TagOrTextType = "text" | "open" | "close";

export interface OpenTag extends BaseTagOrText {
  id: string;
  type: "open";
}
export interface CloseTag extends BaseTagOrText {
  type: "close";
}
export interface Text extends BaseTagOrText {
  type: "text";
}

export type TagOrText = OpenTag | CloseTag | Text;
export type IndexedTagOrText = TagOrText & { index: number };
