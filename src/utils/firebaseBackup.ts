import { fireConfig, fireConfig_babycare, fireConfig_adoptpet } from "../config/firebaseConnect.config";

const backupAccountData = async (collectionName: String) => {
  const firestoreDb =
    collectionName === "account2020" ? fireConfig_babycare.firestore() : collectionName === "Account2021" ? fireConfig_adoptpet.firestore() : fireConfig.firestore();
  // const firestoreDb = fireConfig_adoptpet.firestore();
  const querySnapshot = await firestoreDb.collection(`${collectionName}`).get();

  let accountObj: string[] = [];

  querySnapshot.forEach((doc) => {
    const documentItem: any = doc.data();
    // console.log({ documentItem });
    documentItem.id = doc.id;
    accountObj.push(documentItem);
  });

  return accountObj;
};
