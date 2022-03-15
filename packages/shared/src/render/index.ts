import type { RestructuredNode } from "..";

export function renderNode(node: RestructuredNode): string {
  if (node.name == "text") {
    return node.text;
  }
  const childHtml =
    node.children?.reduce((a, c) => (a += renderNode(c)), "") ?? "";
  return `${getOpeningTag(node)}${childHtml}${getClosingTag(node)}`;
}

function getOpeningTag(node: RestructuredNode) {
  let tag = "";
  switch (node.name) {
    case "a":
      tag = `<a href="${node.href}"`;
      break;
    case "li":
      tag = `<li style="list-style-type:'${node.marker?.text ?? ""}'"`;
      break;
    case "hidden":
      tag = "<span class=hidden";
      break;
    case "inline":
      tag = "";
      break;
    default:
      tag = `<${node.name}`;
  }
  if (tag) {
    tag += ` id="${node.id}">`;
  }
  return tag;
}

function getClosingTag(node: RestructuredNode) {
  let tag = "";
  switch (node.name) {
    case "hidden":
      tag = "</span>";
      break;
    case "inline":
      tag = "";
      break;
    default:
      tag = `</${node.name}>`;
  }
  return tag;
}
