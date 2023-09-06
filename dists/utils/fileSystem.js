"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLocalJsonFile = void 0;
const fs_1 = require("fs");
// import { resolve } from "path";
// Write json file into to local file system.
const writeLocalJsonFile = (path, name, jsonObj) => {
    // convert JSON object to string
    const objStr = JSON.stringify(jsonObj);
    // write JSON string to a file
    const fileName = `${name}_${new Date().toISOString().slice(0, 10)}_${Math.floor(Math.random() * 10000)}.json`;
    const paths = `${path}/dists/backupdata/${fileName}`;
    try {
        (0, fs_1.writeFileSync)(paths, JSON.stringify(jsonObj, null, 2), "utf8");
        console.log("Data successfully saved to disk");
        return fileName;
    }
    catch (error) {
        console.log("An error has occurred ", error);
    }
};
exports.writeLocalJsonFile = writeLocalJsonFile;
//# sourceMappingURL=fileSystem.js.map