import { ALL_TAGS } from './tagConstants';

export type TagName = typeof ALL_TAGS[number]["name"];
export interface TagConfig {
  name: string;
  // if true tag is assigned by comes the code, if false it is conferred by a selection rule
  default: boolean;
  // if true the parseing of this tag can restructure the HTML
  modifies: boolean;
  // containers group elements, paragraphs get margins, inline does not get margins
  type: "container" | "paragraph" | "inline" | "text" | "hidden";
}
