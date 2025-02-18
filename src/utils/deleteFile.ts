import * as fs from "fs";
import path from "path";

export default function deleteFile(filePath: string) {
  const resolvedPath = path.resolve(__dirname, `../../${filePath}`);
  fs.unlinkSync(resolvedPath);
}

