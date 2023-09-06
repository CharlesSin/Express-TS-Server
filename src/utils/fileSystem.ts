import fs, { writeFileSync } from "fs";
// import { resolve } from "path";

// Write json file into to local file system.
export const writeLocalJsonFile = (path: String, name: String, jsonObj: Object) => {
  // convert JSON object to string
  const objStr = JSON.stringify(jsonObj);

  // write JSON string to a file
  const fileName = `${name}_${new Date().toISOString().slice(0, 10)}_${Math.floor(Math.random() * 10000)}.json`;

  const paths = `${path}/dists/backupdata/${fileName}`;

  try {
    writeFileSync(paths, JSON.stringify(jsonObj, null, 2), "utf8");
    console.log("Data successfully saved to disk");
    return fileName;
  } catch (error) {
    console.log("An error has occurred ", error);
  }
};
