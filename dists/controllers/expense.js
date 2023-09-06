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
exports.backupExpenseYear = exports.backupExpense = exports.updateExpense = exports.deleteExpense = exports.getAllExpense = void 0;
const expense_1 = require("../db/expense");
const dropTable_1 = require("../utils/dropTable");
const firebaseBackup_1 = require("../utils/firebaseBackup");
const transferData_1 = require("../utils/transferData");
const fileSystem_1 = require("../utils/fileSystem");
const getAllExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = yield (0, expense_1.getExpense)();
        return res.status(200).json(expense);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getAllExpense = getAllExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield (0, expense_1.deleteExpenseById)(id);
        return res.json(deletedUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.deleteExpense = deleteExpense;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { date } = req.body;
        if (!date) {
            return res.sendStatus(400);
        }
        const user = yield (0, expense_1.getExpenseById)(id);
        user.date = date;
        yield user.save();
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.updateExpense = updateExpense;
/**
 * Backup from firebase data & transfer data to mongodb
 * @param req
 * @param res
 */
const backupExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    try {
        if (status) {
            yield (0, dropTable_1.dropMongoDBTable)();
            const response2023 = yield (0, firebaseBackup_1.backupAccountData)("Account2023");
            yield (0, transferData_1.transferData)(response2023);
            return res
                .status(200)
                .json({
                message: "Backup & transfer successfully",
            })
                .end();
        }
        else {
            return res
                .status(204)
                .json({
                message: "Update data failed coz status is false",
            })
                .end();
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.backupExpense = backupExpense;
const backupExpenseYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.body;
    (0, firebaseBackup_1.backupAccountData)(`account${year}`)
        .then((response) => {
        const result = (0, fileSystem_1.writeLocalJsonFile)("./", `account${year}`, response);
        return res
            .status(200)
            .json({
            result,
            message: `Success save filename: ${result}`,
        })
            .end();
    })
        .catch((err) => {
        console.error(err);
        return res.sendStatus(400);
    });
});
exports.backupExpenseYear = backupExpenseYear;
//# sourceMappingURL=expense.js.map