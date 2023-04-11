import fs from "fs";
import path from "path";

const dirPath = "./images";
const files = fs.readdirSync(dirPath);

for (const file of files) {
  const oldPath = path.join(dirPath, file);
  const newName = file.replace(/[\s()]+/g, "");
  const newPath = path.join(dirPath, newName);
  if (oldPath !== newPath) {
    console.log(`Renaming ${oldPath} to ${newPath}`);
    fs.renameSync(oldPath, newPath);
  }
}
