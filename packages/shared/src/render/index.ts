import type { RestructuredNode, TagOrText } from "..";

export function nodeToTextAndTags(node: RestructuredNode): TagOrText[] {
  if ("text" in node && node.text) {
    return [
      {
        id: node.id,
        text: node.text,
        type: "text",
        origin: "original",
      },
    ];
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
        type: "close",
        text: `<span id="${node.marker.id}" class="marker">`,
        id: node.id,
        origin: "original",
      },
      {
        type: "text",
        text: node.marker.text,
        id: node.id,
        origin: "original",
      },
      {
        type: "text",
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
