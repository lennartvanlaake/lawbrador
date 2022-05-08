import type { RestructuredNode, TagOrText } from "..";
import type { TextNode } from "../schemas/scrapeTypes";

export function renderText(node: RestructuredNode) {
  const childText =
    node.children?.reduce(
      (p: string, c: RestructuredNode) => (p += renderText(c)),
      ""
    ) ?? "";
  if ("text" in node) {
    return node.text ?? "" + childText;
  }
  return childText;
}

export function nodeToTextAndTags(node: RestructuredNode): TagOrText[] {
  if ("text" in node && node.text) {
    return [textAndIdToNode(node.text, node.id)];
  }
  const marker = renderListMarker(node);
  const opening: TagOrText = {
    id: node.id,
    text: getOpeningTag(node),
    type: "open",
    origin: "original",
  };
  const children: TagOrText[] =
    node.children?.flatMap((it) => nodeToTextAndTags(it)) ?? [];
  const closing: TagOrText = {
    id: node.id,
    text: getClosingTag(node),
    type: "close",
    origin: "original",
  };
  return [...marker, opening, ...children, closing];
}

function renderListMarker(node: RestructuredNode): TagOrText[] {
  if ("marker" in node && node.marker) {
    return [
      {
        type: "open",
        text: `<span id="${node.marker.id}" class="marker">`,
        id: node.id,
        origin: "original",
      },
      textAndIdToNode(node.marker.text, node.marker.id),

      {
        type: "close",
        text: `</span>`,
        id: node.id,
        origin: "original",
      },
    ];
  } else {
    return [];
  }
}

function getOpeningTag(node: RestructuredNode) {
  let tag = "";
  switch (node.name) {
    case "a":
      tag = `<a href="${node.href}"`;
      break;
    case "hidden":
      tag = `<span class="hidden"`;
      break;
    case "inline":
      tag = "<span";
      break;
    default:
      tag = `<${node.name}`;
  }
  tag += ` id="${node.id}">`;
  return tag;
}

function getClosingTag(node: RestructuredNode) {
  let tag = "";
  switch (node.name) {
    case "hidden":
      tag = "</span>";
      break;
    case "inline":
      tag = "</span>";
      break;
    default:
      tag = `</${node.name}>`;
  }
  return tag;
}

export function textAndIdToNode(text: string, id: string): TagOrText {
  return {
    type: "text",
    text: text,
    id: id,
    origin: "original",
  };
}
