import fs from "fs";
import path from "path";

const dirPath = "./images";
const files = fs.readdirSync(dirPath);

for (const file of files) {
  if (path.extname(file).toLowerCase() === ".jpeg") {
    const filePath = path.join(dirPath, file);
    console.log("reading file: ", filePath);
    const data = fs.readFileSync(filePath);
    try {
      jpeg.decode(data);
      const newName = file.replace(/[\s()]+/g, "");
      const newPath = path.join(dirPath, newName);
      if (oldPath !== newPath) {
        console.log(`Renaming ${oldPath} to ${newPath}`);
        fs.renameSync(oldPath, newPath);
      }
    } catch (err) {
      console.log(`Removing ${file}: ${err}`);
      fs.unlinkSync(filePath);
    }
  }
}
