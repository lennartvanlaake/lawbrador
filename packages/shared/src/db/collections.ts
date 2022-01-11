import {LawbradorEvent} from "../schemas/generic";
import {SourceSiteConfig} from "../schemas/rules";
import {TypedCollection} from "./Collection";

export const EVENT_COLLECTION = new TypedCollection<LawbradorEvent<any>>("events");
export const SOURCE_CONFIG_COLLECTION = new TypedCollection<SourceSiteConfig>("sourceConfig");
