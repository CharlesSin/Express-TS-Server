// import firebase module.
import * as admin from "firebase-admin";
import dotenv from "dotenv";

// import service account
import * as serviceAccount from "./service.json";
import * as babycareServiceAccount from "./babycare.json";
import * as adoptpetServiceAccount from "./adoptpet.json";

dotenv.config();

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

const defaultAppConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
};

const babycareAppConfig = {
  credential: admin.credential.cert(babycareServiceAccount),
  databaseURL: "https://babycare-f3a4b.firebaseio.com",
};

const adoptpetAppConfig = {
  credential: admin.credential.cert(adoptpetServiceAccount),
  databaseURL: "https://adoptpet-fc8fa.firebaseio.com",
};

// firebase init
const fireConfig = admin.initializeApp(defaultAppConfig, "DEFAULT");
const fireConfig_babycare = admin.initializeApp(babycareAppConfig, "babycare");
const fireConfig_adoptpet = admin.initializeApp(adoptpetAppConfig, "adoptpet");

export { fireConfig, fireConfig_babycare, fireConfig_adoptpet };
