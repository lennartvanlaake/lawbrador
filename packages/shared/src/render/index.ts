import type { RestructuredNode } from "..";

export function renderNode(node: RestructuredNode): string {
  if (node.name == "text") {
    return node.text;
  }
  const markerHtml = renderListMarker(node);
  const childHtml =
    markerHtml + node.children?.reduce((a, c) => (a += renderNode(c)), "") ??
    "";
  return `${getOpeningTag(node)}${childHtml}${getClosingTag(node)}`;
}

function renderListMarker(node: RestructuredNode): string {
  if ("marker" in node && node.marker) {
    return `<span id="${node.marker.id}" class="marker">${node.marker.text} </span>`;
  } else {
    return "";
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
