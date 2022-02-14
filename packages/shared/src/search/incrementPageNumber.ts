import {HtmlSearchRuleSet} from "..";


export function incrementPageNumber(
	searchInput: Record<string, string>,
	config: HtmlSearchRuleSet,
): Record<string, string> {
	const pageVariableName = config.pageVariable;
	let lastPageValue = searchInput[pageVariableName];
	let pageNumber: number;
	if (!lastPageValue) {
		pageNumber = 2;
	} else {
		let lastPageNumber = parseInt(lastPageValue);
		if (Number.isNaN(lastPageNumber)) {
			throw Error(
				`cannot parse ${searchInput[pageVariableName]} to a number`,
			);
		}
		pageNumber = lastPageNumber + 1;
	}
	searchInput[pageVariableName] = pageNumber.toString();
	return searchInput;
}
