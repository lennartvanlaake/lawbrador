import { tagName } from "./tags";

type TagOrTextOrigin = "original" | "marker" | "search";

type TagOrTextType = "text" | "open" | "close";

export interface TagOrText {
  id: string;
  type: TagOrTextType;
  origin: TagOrTextOrigin;
  text: string;
}

export type UnidentifiedTagOrText = Omit<TagOrText, "id"> 
export type IndexedTagOrText = TagOrText & { index: number };
