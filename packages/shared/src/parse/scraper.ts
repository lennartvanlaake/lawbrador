import cheerio, { Node, CheerioAPI } from "cheerio";
import axios from "axios";
import type { ParsedNode, ScrapeResult } from "@lawbrador/shared";

const ignoredNodes = ["script", "style", "iframe"]

interface NodeAttributes {
  id?: string;
  class?: string;
  href?: string;
}

declare module "cheerio" {
  export interface Node {
    children?: Node[];
    data?: string;
    name?: string;
    attribs?: NodeAttributes;
  }
}

function parseNode(node: Node, $: CheerioAPI): ParsedNode | null {
  let output: ParsedNode = {
    tags: node.name ? [node.name] : [],
    ids: node.attribs?.id ? [node.attribs.id] : [],
    classes: node.attribs?.class ? [node.attribs.class] : [],
    href: node.attribs?.href,
    text: node.data?.trim(),
    children: node.children
      ?.filter((it) => !ignoredNodes.includes(it.name ?? ""))
      .map((child) => parseNode(child, $) as ParsedNode)
      .filter((it) => it),
  };

  // if there is neither non-whitespace text nor children then ignore the node
  if ((!output.children || output.children?.length == 0) && !output.text)
    return null;

  // flatten if this is a tag only containing one other tag
  if (
    output.children &&
    output.children.length == 1 &&
    !output.children[0].text
  ) {
    const childOutput = output.children[0];
    if (childOutput) {
      childOutput.tags = childOutput.tags.concat(output.tags);
      childOutput.ids = childOutput.ids.concat(output.ids);
      childOutput.classes = childOutput.classes.concat(output.classes);
    }
    return childOutput;
  }

  return output;
}

export function parse(html: string): ParsedNode {
  const $ = cheerio.load(html);
  const body = parseNode($("body")[0], $);
  if (!body) {
    throw new Error("Could not find body in HTML");
  }
  return body;
}

export async function scrape(url: string, hash: string): Promise<ScrapeResult> {
  const body = await axios.get(url);
  return {
    url: url,
    hash: hash,
    body: parse(body.data),
  };
}
