import type { SearchParams } from "..";
import { PAGE_VARIABLE_NAME } from "../constants/other";

export function incrementPageNumber(searchInput: SearchParams): SearchParams {
  const lastPageValue = searchInput[PAGE_VARIABLE_NAME];
  let pageNumber: number;
  if (!lastPageValue) {
    pageNumber = 2;
  } else {
    const lastPageNumber = parseInt(lastPageValue);
    if (Number.isNaN(lastPageNumber)) {
      throw Error(`cannot parse page to a number`);
    }
    pageNumber = lastPageNumber + 1;
  }
  searchInput[PAGE_VARIABLE_NAME] = pageNumber.toString();
  return searchInput;
}
