import { readFileSync } from "fs";

import weaviate from "weaviate-ts-client";

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const testImg = readFileSync("./images/Coast-Test86.jpeg");

const b64 = Buffer.from(testImg).toString("base64");

const res = await client.data
  .creator()
  .withClassName("Photo")
  .withProperties({
    image: b64,
  })
  .do();
