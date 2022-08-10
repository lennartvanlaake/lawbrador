import type { FastifyInstance } from "fastify";
import { id } from "@lawbrador/db";
import EventFactory from "@lawbrador/events/src/eventFactory";
import { Annotation, Endpoints, Identity, IdentityParams, Schemas, toIdentity, UnsavedAnnotation } from "@lawbrador/shared";

export default async (fastify: FastifyInstance) => {
    fastify.get(Endpoints.ANNOTATIONS, async () => {
      const annotations = await fastify.collections.annotations.all();
      return annotations;
    });

    fastify.route<{ Params: IdentityParams }>({
      method: "GET",
      url: `${Endpoints.ANNOTATIONS}/:id`,
      schema: {
        response: {
          200: Schemas.annotation
        } 
      },
      handler: async (req) => {
        debugger;
        const annotation = await fastify.collections.annotations.get(req.params.id);
        return annotation;
      }
    });

    fastify.route<{ Body: UnsavedAnnotation }>({
      method: "POST",
      url: Endpoints.ANNOTATIONS,
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
      url: Endpoints.ANNOTATIONS,
      schema: {
        body: Schemas.annotation,
      },
      handler: async (req) => {
        await fastify.events.processSync(
          EventFactory.AnnotationUpdated({ annotation: req.body })
        );
        return toIdentity(req.body._id);
      },
    });
  };
  