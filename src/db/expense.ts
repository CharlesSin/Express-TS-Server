import mongoose from "mongoose";

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

export const ExpenseModel = mongoose.model("allexpense", ExpenseSchema);

// User Actions
export const getExpense = () => ExpenseModel.find();
export const getExpenseById = (id: string) => ExpenseModel.findById(id);
export const createExpense = (values: Record<string, any>) => new ExpenseModel(values).save().then((user) => user.toObject());
export const deleteExpenseById = (id: string) => ExpenseModel.findOneAndDelete({ _id: id });
export const updateExpenseById = (id: string, values: Record<string, any>) => ExpenseModel.findByIdAndUpdate(id, values);
