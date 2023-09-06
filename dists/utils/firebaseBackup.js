"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backupAccountData = void 0;
const firebaseConnect_config_1 = require("../config/firebaseConnect.config");
const backupAccountData = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    const firestoreDb = collectionName === "account2020" ? firebaseConnect_config_1.fireConfig_babycare.firestore() : collectionName === "Account2021" ? firebaseConnect_config_1.fireConfig_adoptpet.firestore() : firebaseConnect_config_1.fireConfig.firestore();
    // const firestoreDb = fireConfig_adoptpet.firestore();
    const querySnapshot = yield firestoreDb.collection(`${collectionName}`).get();
    let accountObj = [];
    querySnapshot.forEach((doc) => {
        const documentItem = doc.data();
        documentItem.id = doc.id;
        accountObj.push(documentItem);
    });
    return accountObj;
});
exports.backupAccountData = backupAccountData;
//# sourceMappingURL=firebaseBackup.js.map