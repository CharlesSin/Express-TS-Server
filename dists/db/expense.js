"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpenseById = exports.deleteExpenseById = exports.createExpense = exports.getExpenseById = exports.getExpense = exports.ExpenseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
exports.ExpenseModel = mongoose_1.default.model("allexpense", ExpenseSchema);
// User Actions
const getExpense = () => exports.ExpenseModel.find();
exports.getExpense = getExpense;
const getExpenseById = (id) => exports.ExpenseModel.findById(id);
exports.getExpenseById = getExpenseById;
const createExpense = (values) => new exports.ExpenseModel(values).save().then((user) => user.toObject());
exports.createExpense = createExpense;
const deleteExpenseById = (id) => exports.ExpenseModel.findOneAndDelete({ _id: id });
exports.deleteExpenseById = deleteExpenseById;
const updateExpenseById = (id, values) => exports.ExpenseModel.findByIdAndUpdate(id, values);
exports.updateExpenseById = updateExpenseById;
//# sourceMappingURL=expense.js.map