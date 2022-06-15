import type { FastifyInstance } from "fastify";
import { id } from "@lawbrador/db";
import EventFactory from "@lawbrador/events/src/eventFactory";
import { Annotation, Endpoints, Schemas, toIdentity, UnsavedAnnotation } from "@lawbrador/shared";

export default async (fastify: FastifyInstance) => {
    fastify.get(Endpoints.ANNOTATIONS, async () => {
      const sourceConfigs = await fastify.collections.annotations.all();
      return sourceConfigs;
    });
    fastify.route<{ Body: UnsavedAnnotation }>({
      method: "POST",
      url: Endpoints.SOURCES,
      schema: {
        body: Schemas.unsavedAnnotation,
      },
      handler: async (req) => {
        const newAnnotation = { ...req.body, _id: id() }
        console.log(newAnnotation._id)
        await fastify.events.processSync(
          EventFactory.AnnotationCreated({ annotation: newAnnotation })
        );
        return toIdentity(newAnnotation._id)
      },
    });
    fastify.route<{ Body: Annotation }>({
      method: "PUT",
      url: Endpoints.SOURCES,
      schema: {
        body: Schemas.sourceSiteConfig,
      },
      handler: async (req) => {
        await fastify.events.processSync(
          EventFactory.AnnotationUpdated({ annotation: req.body })
        );
        return toIdentity(req.body._id);
      },
    });
  };
  