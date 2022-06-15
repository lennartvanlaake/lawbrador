import EventFactory from "../eventFactory";
import { LAWBRADOR_REGISTRY as registry } from "../index";
import { Annotation } from "@lawbrador/shared";
import { expect } from "chai";
import { id } from "@lawbrador/db";

const fakeAnnotation: Annotation = {
    _id: id(),
    name: "nepperd",
    markings: []
}

// the DB connection and the cleaning betweens tests is done automagically in the testconfig.ts script
describe("Processing annotation events", () => {
  it("creates a annotation on created event", async () => {
    await registry.processSync(
      EventFactory.AnnotationCreated({ annotation: { ...fakeAnnotation } })
    );  
    const annotation = await registry.collections.annotations.get(fakeAnnotation._id)  
    expect(annotation?._id).to.eq(fakeAnnotation._id);
  });
  it("updates annotation on updated event", async () => {
    const NEW_NAME = "something else";
    await registry.processSync(
      EventFactory.AnnotationCreated({ annotation: { ...fakeAnnotation } })
    );    
    const newAnnotation = { ...fakeAnnotation };
    newAnnotation.name = NEW_NAME;
    await registry.processSync(
      EventFactory.AnnotationUpdated({ annotation: { ...newAnnotation } })
    );
    const annotation = await registry.collections.annotations.get(fakeAnnotation._id)  
    expect(annotation?.name).to.eq(NEW_NAME);
  });
});
