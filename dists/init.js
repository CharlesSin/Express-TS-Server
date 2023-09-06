"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// import firebase module.
const admin = __importStar(require("firebase-admin"));
const fs = __importStar(require("fs"));
dotenv.config();
// User Config
const ExpenseSchema = new mongoose_1.default.Schema({
    date: { type: String, required: true },
    item: { type: String, required: true },
    price: { type: String, required: true },
    pay: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    timestamp: { type: Number, required: true },
    id: { type: String, required: true },
});
const ExpenseModel = mongoose_1.default.model("allexpense", ExpenseSchema);
const dropMongoDBTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ExpenseModel.collection.drop();
        console.log("Table Already Drop");
    }
    catch (err) {
        console.log({ err });
    }
    finally {
        console.log("MongoDB Disconnect");
    }
});
// firebase config.
const SERVICE_ACCOUNT = {
    type: process.env.FIREBASE_TYPE,
    project_id: `${process.env.FIREBASE_PROJECT_ID}`,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n") : undefined,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};
const ADOPTPET_SERVICE_ACCOUNT = {
    type: process.env.ADOPTPET_FIREBASE_TYPE,
    project_id: `${process.env.ADOPTPET_FIREBASE_PROJECT_ID}`,
    private_key_id: process.env.ADOPTPET_FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.ADOPTPET_FIREBASE_PRIVATE_KEY ? process.env.ADOPTPET_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n") : undefined,
    client_email: process.env.ADOPTPET_FIREBASE_CLIENT_EMAIL,
    client_id: process.env.ADOPTPET_FIREBASE_CLIENT_ID,
    auth_uri: process.env.ADOPTPET_FIREBASE_AUTH_URI,
    token_uri: process.env.ADOPTPET_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.ADOPTPET_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.ADOPTPET_FIREBASE_CLIENT_X509_CERT_URL,
};
const BABYCARE_SERVICE_ACCOUNT = {
    type: process.env.BABYCARE_FIREBASE_TYPE,
    project_id: `${process.env.BABYCARE_FIREBASE_PROJECT_ID}`,
    private_key_id: process.env.BABYCARE_FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.BABYCARE_FIREBASE_PRIVATE_KEY ? process.env.BABYCARE_FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n") : undefined,
    client_email: process.env.BABYCARE_FIREBASE_CLIENT_EMAIL,
    client_id: process.env.BABYCARE_FIREBASE_CLIENT_ID,
    auth_uri: process.env.BABYCARE_FIREBASE_AUTH_URI,
    token_uri: process.env.BABYCARE_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.BABYCARE_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.BABYCARE_FIREBASE_CLIENT_X509_CERT_URL,
};
const defaultAppConfig = {
    credential: admin.credential.cert(SERVICE_ACCOUNT),
    // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
};
const babycareAppConfig = {
    credential: admin.credential.cert(BABYCARE_SERVICE_ACCOUNT),
    databaseURL: "https://babycare-f3a4b.firebaseio.com",
};
const adoptpetAppConfig = {
    credential: admin.credential.cert(ADOPTPET_SERVICE_ACCOUNT),
    databaseURL: "https://adoptpet-fc8fa.firebaseio.com",
};
// firebase init
const fireConfig = admin.initializeApp(defaultAppConfig, "DEFAULT");
const fireConfig_babycare = admin.initializeApp(babycareAppConfig, "babycare");
const fireConfig_adoptpet = admin.initializeApp(adoptpetAppConfig, "adoptpet");
const backupAccountData = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    const firestoreDb = collectionName === "account2020" ? fireConfig_babycare.firestore() : collectionName === "Account2021" ? fireConfig_adoptpet.firestore() : fireConfig.firestore();
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
function addData({ date, item, price, pay, type, category, timestamp, id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveExpenseStatus = yield new ExpenseModel({
            date,
            item,
            price,
            pay: pay === "Chris" ? "Crystal" : pay,
            type,
            category,
            timestamp,
            id,
        }).save();
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(saveExpenseStatus);
            }, Math.floor(Math.random() * 1000));
        });
    });
}
const transferData = (response) => __awaiter(void 0, void 0, void 0, function* () {
    const twentyThree = response;
    const start = new Date().getTime();
    const twentyString = fs.readFileSync("./dists/backupdata/account2020_2023-05-25_2458.json", "utf-8");
    const twenty = JSON.parse(twentyString);
    console.log(twenty);
    const twentyOneString = fs.readFileSync("./dists/backupdata/Account2021_2023-05-25_7293.json", "utf-8");
    const twentyOne = JSON.parse(twentyOneString);
    console.log(twentyOne);
    const twentyTwoString = fs.readFileSync("./dists/backupdata/Account2022_2023-05-25_6263.json", "utf-8");
    const twentyTwo = JSON.parse(twentyTwoString);
    console.log(twentyTwo);
    for (let index = 0; index < twentyOne.length; index++) {
        const expense = twentyOne[index];
        const numFruit = yield addData(expense);
        console.log(numFruit);
    }
    for (let index = 0; index < twentyTwo.length; index++) {
        const expense = twentyTwo[index];
        const numFruit = yield addData(expense);
        console.log(numFruit);
    }
    for (let index = 0; index < twentyThree.length; index++) {
        const expense = twentyThree[index];
        console.log({ expense });
        const numFruit = yield addData(expense);
        console.log(numFruit);
    }
    console.log(`Start: ${start}`);
    const total = twentyOne.length + twentyTwo.length + twentyThree.length;
    console.log(`2020 Data Size: ${twenty.length}`);
    console.log(`2021 Data Size: ${twentyOne.length}`);
    console.log(`2022 Data Size: ${twentyTwo.length}`);
    console.log(`2023 Data Size: ${twentyThree.length}`);
    console.log(`End: ${new Date().getTime()}`);
    console.log(`3yrs Data Total Size: ${total}`);
    const ms = new Date().getTime() - start;
    const second = ms / 1000;
    const minute = second / 60;
    const hour = minute / 60;
    const day = hour / 60;
    console.log(`Total time spend day: ${day}`);
    console.log(`Total time spend hour: ${hour}`);
    console.log(`Total time spend minute: ${minute}`);
    console.log(`Total time spend second: ${second}`);
    console.log(`Total time spend ms: ${ms}`);
    console.log(`Today: ${new Date()}`);
});
const initBackup = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGO_URL = process.env.MONGODB_URL;
    mongoose_1.default.Promise = Promise;
    mongoose_1.default.connect(MONGO_URL);
    mongoose_1.default.connection.on("error", (error) => console.log(error));
    yield dropMongoDBTable();
    const response2023 = yield backupAccountData("Account2023");
    yield transferData(response2023);
    console.log("initBackup");
});
initBackup();
//# sourceMappingURL=init.js.map