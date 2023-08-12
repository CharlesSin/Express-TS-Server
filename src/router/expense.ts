import express from "express";

import { getAllExpense, deleteExpense, updateExpense } from "../controllers/expense";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/expense", isAuthenticated, getAllExpense);
  router.delete("/expense/:id", isAuthenticated, isOwner, deleteExpense);
  router.patch("/expense/:id", isAuthenticated, isOwner, updateExpense);
};
