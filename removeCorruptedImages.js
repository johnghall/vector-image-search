import fs from "fs";
import path from "path";
import jpeg from "jpeg-js";

const dirPath = "./images";
const files = fs.readdirSync(dirPath);

for (const file of files) {
  if (path.extname(file).toLowerCase() === ".jpeg") {
    const filePath = path.join(dirPath, file);
    console.log("reading file: ", filePath);
    const data = fs.readFileSync(filePath);
    try {
      jpeg.decode(data);
    } catch (err) {
      console.log(`Removing ${file}: ${err}`);
      fs.unlinkSync(filePath);
    }
  }
}
