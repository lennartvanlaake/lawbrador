import type {
  Annotation,
  Hashed,
  LawbradorEvent,
  RestructuredDocument,
  ScrapeResult,
  SourceSiteConfig,
} from "@lawbrador/shared";
import TypedCollection from "./Collection";
import TypedCache from "./Cache";

export const EVENT_COLLECTION = new TypedCollection<LawbradorEvent<any>>(
  "events"
);
export const SOURCE_CONFIG_COLLECTION = new TypedCollection<SourceSiteConfig>(
  "sourceConfigs"
);
export const ANNOTATIONS = new TypedCollection<Annotation>("annotations");
export const DOCUMENT_SCRAPE_CACHE = new TypedCache<ScrapeResult & Hashed>(
  "documentScrapeCache"
);
export const SEARCH_CACHE = new TypedCache<ScrapeResult & Hashed>(
  "searchCache"
);

export const ALL_COLLECTIONS = {
  events: EVENT_COLLECTION,
  sourceConfigs: SOURCE_CONFIG_COLLECTION,
  documentScrapeCache: DOCUMENT_SCRAPE_CACHE,
  searchCache: SEARCH_CACHE,
  annotations: ANNOTATIONS
};
