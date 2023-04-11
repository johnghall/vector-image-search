import weaviate from "weaviate-ts-client";
import { readdirSync } from "fs";

const BATCH_SIZE = 100;

const imageToBase64 = (image) => {
  return Buffer.from(image).toString("base64");
};

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const images = readdirSync("./images/");

const imagePromises = images.map(async (jpeg) => {
  const b64 = imageToBase64(`./images/${jpeg}`);

  await client.data
    .creator()
    .withClassName("Photo")
    .withProperties({
      image: b64,
    })
    .do();
});

let pointer = 0;
let counter = 0;

while (pointer < imagePromises.length) {
  console.log(
    `beginning batch ${counter++} with image ${pointer} to image ${
      pointer + BATCH_SIZE - 1
    } `
  );
  const batch = imagePromises.slice(pointer, pointer + BATCH_SIZE);
  await Promise.all(batch);
}

console.log("done!");
