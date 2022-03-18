import type { LinkNode, SourceSiteConfig } from "..";
import { makeLinkAbsolute } from "..";
const linkRegex = /#.*$/;

export function adjustLinkNode(
  node: LinkNode,
  sourceUrl: string,
  idMap: Record<string, string>,
  sourceConfig: SourceSiteConfig
): LinkNode {
  const hashtagComponent = makeElementIdsInternal(node.href, idMap);
  node.href = `${makeLinkInternal(
    node.href,
    sourceUrl,
    sourceConfig._id
  )}${hashtagComponent}`;
  return node;
}

function makeElementIdsInternal(link: string, idMap: Record<string, string>) {
  const hashtagMatch = decodeURIComponent(link).match(linkRegex);
  if (!hashtagMatch) return "";
  const originalId = hashtagMatch[0].substring(1);
  const newId = idMap[originalId];
  if (newId) {
    return `#${newId}`;
  } else {
    return "";
  }
}

function makeLinkInternal(link: string, sourceUrl: string, configId: string) {
  return `./document?url=${encodeURIComponent(
    makeLinkAbsolute(link, sourceUrl)
  )}&sourceConfigId=${configId}`;
}
