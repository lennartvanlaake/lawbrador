import { LinkNode, logObject, SourceSiteConfig } from "..";
import { makeLinkAbsolute } from "..";
"  dafds"
const linkRegex = /#.*$/;

export function adjustLinkNode(
  node: LinkNode,
  sourceUrl: string,
  idMap: Record<string, string>,
  sourceConfig: SourceSiteConfig
): LinkNode {
  node.href = makeElementIdsInternal(node.href, idMap);
  node.href = makeLinkInternal(node.href, sourceUrl, sourceConfig._id);
  return node;
}

function makeElementIdsInternal(link: string, idMap: Record<string, string>) {
  const hashtagMatch = link.match(linkRegex);
  if (!hashtagMatch) return link;
  const originalId = hashtagMatch[0].substring(1);
  const newId = idMap[originalId];
  if (newId) return link.replace(originalId, newId).trim();
  return link;
}

function makeLinkInternal(link: string, sourceUrl: string, configId: string) {
  return `./document?url=${encodeURIComponent(
    makeLinkAbsolute(link, sourceUrl)
  )}&sourceConfigId=${configId}`;
}
