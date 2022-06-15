import type { Annotation, LawbradorEvent, SourceSiteConfig, UnsavedAnnotation } from "@lawbrador/shared";

export interface SourceConfigUpdated {
  sourceConfig: SourceSiteConfig;
}
export const SOURCE_CONFIG_UPDATED = "SourceConfigUpdated";

export interface SourceConfigCreated {
  sourceConfig: SourceSiteConfig;
}
export const SOURCE_CONFIG_CREATED = "SourceConfigCreated";

export interface AnnotationCreated {
  annotation: Annotation;
}
export const ANNOTATION_CREATED = "AnnotationCreated"

export interface AnnotationUpdated {
  annotation: Annotation;
}
export const ANNOTATION_UPDATED = "AnnotationUpdated"

export default class EventFactory {
  static SourceConfigUpdated(
    data: SourceConfigUpdated
  ): LawbradorEvent<SourceConfigUpdated> {
    return {
      type: SOURCE_CONFIG_UPDATED,
      data: data,
    };
  }
  static SourceConfigCreated(
    data: SourceConfigCreated
  ): LawbradorEvent<SourceConfigCreated> {
    return {
      type: SOURCE_CONFIG_CREATED,
      data: data,
    };
  }
  static AnnotationCreated(
    data: AnnotationCreated
  ): LawbradorEvent<AnnotationCreated> {
    return {
      type: ANNOTATION_CREATED,
      data: data
    }
  }
  static AnnotationUpdated(
    data: AnnotationUpdated
  ): LawbradorEvent<AnnotationUpdated> {
    return {
      type: ANNOTATION_UPDATED,
      data: data
    }
  }
}
