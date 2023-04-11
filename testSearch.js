import weaviate from "weaviate-ts-client";
import { readFileSync, writeFileSync } from "fs";

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const testImg = Buffer.from(readFileSync("./beach.jpeg")).toString("base64");

const query = await client.graphql
  .get()
  .withClassName("Photo")
  .withFields(["image"])
  .withNearImage({ image: testImg })
  .withLimit(5)
  .do();

const results = query.data.Get.Photo.map((photo) => photo.image);

results.forEach((result, index) => {
  writeFileSync(`./results/result${index}.jpeg`, result, "base64");
});
