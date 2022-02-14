import {Hashed, LawbradorEvent, ScrapeResult, SourceSiteConfig} from "..";
import TypedCollection from "./Collection";
import TypedCache from './Cache';

export const EVENT_COLLECTION = new TypedCollection<LawbradorEvent<any>>("events");
export const SOURCE_CONFIG_COLLECTION = new TypedCollection<SourceSiteConfig>("sourceConfigs");
export const DOCUMENT_SCRAPE_CACHE = new TypedCache<ScrapeResult & Hashed>("documentCache");
export const SEARCH_CACHE = new TypedCache<ScrapeResult & Hashed>("searchCache");

export const ALL_COLLECTIONS = {
	"events": EVENT_COLLECTION,
	"sourceConfigs": SOURCE_CONFIG_COLLECTION,
	"documentScrapeCache": DOCUMENT_SCRAPE_CACHE, 
	"searchCache": SEARCH_CACHE 
}
