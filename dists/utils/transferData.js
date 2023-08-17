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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferData = void 0;
const expense_1 = require("../db/expense");
const account2020_2023_05_25_2458_json_1 = __importDefault(require("../backupdata/account2020_2023-05-25_2458.json"));
const Account2021_2023_05_25_7293_json_1 = __importDefault(require("../backupdata/Account2021_2023-05-25_7293.json"));
const Account2022_2023_05_25_6263_json_1 = __importDefault(require("../backupdata/Account2022_2023-05-25_6263.json"));
function addData({ date, item, price, pay, type, category, timestamp, id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const saveExpenseStatus = yield new expense_1.ExpenseModel({
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
    for (let index = 0; index < Account2021_2023_05_25_7293_json_1.default.length; index++) {
        const expense = Account2021_2023_05_25_7293_json_1.default[index];
        const numFruit = yield addData(expense);
        console.log(numFruit);
    }
    for (let index = 0; index < Account2022_2023_05_25_6263_json_1.default.length; index++) {
        const expense = Account2022_2023_05_25_6263_json_1.default[index];
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
    const total = Account2021_2023_05_25_7293_json_1.default.length + Account2022_2023_05_25_6263_json_1.default.length + twentyThree.length;
    console.log(`2020 Data Size: ${account2020_2023_05_25_2458_json_1.default.length}`);
    console.log(`2021 Data Size: ${Account2021_2023_05_25_7293_json_1.default.length}`);
    console.log(`2022 Data Size: ${Account2022_2023_05_25_6263_json_1.default.length}`);
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
exports.transferData = transferData;
//# sourceMappingURL=transferData.js.map