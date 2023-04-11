import weaviate from "weaviate-ts-client";
import { readdirSync, readFileSync } from "fs";

const BATCH_SIZE = 100;

const imageToBase64 = (image) => {
  return Buffer.from(image).toString("base64");
};

const client = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

const images = readdirSync("./images");
let counter = 0;
const totalImages = images.length;

const getImagePromises = (imageBatch) => {
  const imagePromises = imageBatch.map(async (jpeg) => {
    const b64 = imageToBase64(readFileSync(`./images/${jpeg}`));

    await client.data
      .creator()
      .withClassName("Photo")
      .withProperties({
        image: b64,
      })
      .do();

    counter += 1;
    console.log(
      `${counter}/${images.length} (${((counter / images.length) * 100).toFixed(
        2
      )}%) completed`
    );
  });

  return imagePromises;
};

let pointer = 0;

while (pointer < images.length) {
  console.log(`##### BATCH POINTER AT: ${pointer} #####`);
  const batch = getImagePromises(images.slice(pointer, pointer + BATCH_SIZE));
  await Promise.all(batch);
  pointer += BATCH_SIZE;
}

console.log("done!");
