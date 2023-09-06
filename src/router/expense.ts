import express from "express";

import { getAllExpense, deleteExpense, updateExpense, backupExpense,backupExpenseYear } from "../controllers/expense";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/expense", isAuthenticated, getAllExpense);
  router.delete("/expense/:id", isAuthenticated, deleteExpense);
  router.patch("/expense/:id", isAuthenticated, updateExpense);
  router.post("/expense/backup", isAuthenticated, backupExpense);
  router.post("/expense/bkyear", isAuthenticated, backupExpenseYear);
};
