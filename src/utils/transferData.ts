import { ExpenseModel } from "../db/expense";

import twenty from "../backupdata/account2020_2023-05-25_2458.json";
import twentyOne from "../backupdata/Account2021_2023-05-25_7293.json";
import twentyTwo from "../backupdata/Account2022_2023-05-25_6263.json";

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

export const transferData = async (response: any) => {
  const twentyThree = response;
  const start = new Date().getTime();

  for (let index = 0; index < twentyOne.length; index++) {
    const expense = twentyOne[index];
    const numFruit = await addData(expense);
    console.log(JSON.stringify(numFruit));
  }

  for (let index = 0; index < twentyTwo.length; index++) {
    const expense = twentyTwo[index];
    const numFruit = await addData(expense);
    console.log(JSON.stringify(numFruit));
  }

  for (let index = 0; index < twentyThree.length; index++) {
    const expense = twentyThree[index];
    const numFruit = await addData(expense);
    console.log(JSON.stringify(numFruit));
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
