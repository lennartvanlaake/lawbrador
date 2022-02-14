import cheerio, { Node, CheerioAPI } from "cheerio";
import axios from "axios";
import type { ParsedNode, ScrapeResult } from "@lawbrador/shared";

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
    name: node.name,
    id: node.attribs?.id,
    class: node.attribs?.class,
    href: node.attribs?.href,
    text: node.data?.trim()
  };

  // apply recursively to children
  output.children = node.children
    ?.map((child) => parseNode(child, $) as ParsedNode)
    .filter((it) => it);

  // if there is neither non-whitespace text nor children then ignore the node
  if ((!output.children || output.children?.length == 0) && !output.text)
    return null;
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
