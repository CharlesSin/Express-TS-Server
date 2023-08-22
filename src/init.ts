import * as dotenv from "dotenv";
import mongoose from "mongoose";

// import firebase module.
import * as admin from "firebase-admin";

import * as fs from "fs";

dotenv.config();

// User Config
const ExpenseSchema = new mongoose.Schema({
  date: { type: String, required: true },
  item: { type: String, required: true },
  price: { type: String, required: true },
  pay: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  timestamp: { type: Number, required: true },
  id: { type: String, required: true },
});

const ExpenseModel = mongoose.model("allexpense", ExpenseSchema);

const dropMongoDBTable = async () => {
  try {
    // await dbConnect();
    await ExpenseModel.collection.drop();
    console.log("Table Already Drop");
  } catch (err) {
    console.log({ err });
  } finally {
    console.log("MongoDB Disconnect");
    // mongoose.disconnect();
  }
};

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
  credential: admin.credential.cert(SERVICE_ACCOUNT as admin.ServiceAccount),
  // credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
};

const babycareAppConfig = {
  credential: admin.credential.cert(BABYCARE_SERVICE_ACCOUNT as admin.ServiceAccount),
  databaseURL: "https://babycare-f3a4b.firebaseio.com",
};

const adoptpetAppConfig = {
  credential: admin.credential.cert(ADOPTPET_SERVICE_ACCOUNT as admin.ServiceAccount),
  databaseURL: "https://adoptpet-fc8fa.firebaseio.com",
};

// firebase init
const fireConfig = admin.initializeApp(defaultAppConfig, "DEFAULT");
const fireConfig_babycare = admin.initializeApp(babycareAppConfig, "babycare");
const fireConfig_adoptpet = admin.initializeApp(adoptpetAppConfig, "adoptpet");

const backupAccountData = async (collectionName: String) => {
  const firestoreDb =
    collectionName === "account2020" ? fireConfig_babycare.firestore() : collectionName === "Account2021" ? fireConfig_adoptpet.firestore() : fireConfig.firestore();
  // const firestoreDb = fireConfig_adoptpet.firestore();
  const querySnapshot = await firestoreDb.collection(`${collectionName}`).get();

  let accountObj: string[] = [];

  querySnapshot.forEach((doc: any) => {
    const documentItem: any = doc.data();
    // console.log({ documentItem });
    documentItem.id = doc.id;
    accountObj.push(documentItem);
  });

  return accountObj;
};

interface ExpenseInterface {
  date: string;
  item: string;
  price: string;
  pay: string;
  type: string;
  category: string;
  timestamp: number;
  id: string;
}

async function addData({ date, item, price, pay, type, category, timestamp, id }: ExpenseInterface) {
  const saveExpenseStatus = await new ExpenseModel({
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
}

const transferData = async (response: any) => {
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
    const numFruit = await addData(expense);
    console.log(numFruit);
  }

  for (let index = 0; index < twentyTwo.length; index++) {
    const expense = twentyTwo[index];
    const numFruit = await addData(expense);
    console.log(numFruit);
  }

  for (let index = 0; index < twentyThree.length; index++) {
    const expense = twentyThree[index];
    console.log({ expense });
    const numFruit = await addData(expense);
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
};

const initBackup = async () => {
  const MONGO_URL = process.env.MONGODB_URL;

  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URL);
  mongoose.connection.on("error", (error: Error) => console.log(error));

  await dropMongoDBTable();

  const response2023 = await backupAccountData("Account2023");

  await transferData(response2023);

  console.log("initBackup");
};

initBackup();
