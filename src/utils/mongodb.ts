import { ExpenseModel } from "../db/expense";

export const dropMongoDBTable = async () => {
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
