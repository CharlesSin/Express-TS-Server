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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireConfig_adoptpet = exports.fireConfig_babycare = exports.fireConfig = void 0;
// import firebase module.
const admin = __importStar(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
exports.fireConfig = fireConfig;
const fireConfig_babycare = admin.initializeApp(babycareAppConfig, "babycare");
exports.fireConfig_babycare = fireConfig_babycare;
const fireConfig_adoptpet = admin.initializeApp(adoptpetAppConfig, "adoptpet");
exports.fireConfig_adoptpet = fireConfig_adoptpet;
//# sourceMappingURL=firebaseConnect.config.js.map