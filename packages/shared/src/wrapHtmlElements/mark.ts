import type { IndexedMatch, Marking } from "..";
import { Errors } from "..";

const ID_REGEX = /(?<=id=")[\w-]+/;

export function getMarking(
  matches: IndexedMatch[],
  selection: Selection,
  tagPositions: IndexedMatch[]
): Marking {
  if (matches.length == 0) {
    throw new Error(Errors.NO_MATCH_FOR_SELECTED);
  }
  if (matches.length == 1) {
    return {
      markedText: selection.toString(),
      occuranceIndex: 0,
    };
  }
  const selectionParentId = selection?.anchorNode?.parentElement?.id;
  if (!selectionParentId) {
    throw new Error(Errors.NO_ID_FOR_SELECTION_ANCHOR);
  }
  const index = matches.findIndex((it) =>
    matchesIdAndOffset(
      it,
      tagPositions,
      selectionParentId,
      selection.anchorOffset
    )
  );
  if (index == -1) {
    throw new Error(Errors.NO_ID_MATCH);
  }
  return {
    markedText: selection.toString(),
    occuranceIndex: index,
  };
}

export function matchesIdAndOffset(
  match: IndexedMatch,
  tagPositions: IndexedMatch[],
  selectionParentId: string,
  selectionOffset: number
) {
  const parentInfo = getParentIdAndOffset(match, tagPositions);
  return (
    parentInfo.id == selectionParentId && parentInfo.offset == selectionOffset
  );
}

export function getParentIdAndOffset(
  match: IndexedMatch,
  tagPositions: IndexedMatch[]
): IdAndOffset {
  let tagPositionIndex = 0;
  let tag = tagPositions[tagPositionIndex];
  let originalMatchIndex = match.index;
  while (tag && tag.index <= originalMatchIndex) {
    originalMatchIndex += tag.length;
    tagPositionIndex++;
    tag = tagPositions[tagPositionIndex];
  }
  const reversedTagsBeforeMatch = tagPositions
    .filter((it) => it.index <= originalMatchIndex)
    .reverse();
  const parent = reversedTagsBeforeMatch[0];
  const id = extractId(parent.string);
  if (!id) throw new Error(Errors.NO_ID_MATCH);
  return {
    id: id,
    // start position of first child node in original html
    offset: originalMatchIndex - (parent.index + parent.length),
  };
}

export function extractId(tag: string): string | null {
  const match = ID_REGEX.exec(tag);
  return match?.at(0) ?? null;
}

interface IdAndOffset {
  id: string;
  offset: number;
}
