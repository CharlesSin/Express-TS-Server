"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expense_1 = require("../controllers/expense");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/expense", middlewares_1.isAuthenticated, expense_1.getAllExpense);
    router.delete("/expense/:id", middlewares_1.isAuthenticated, expense_1.deleteExpense);
    router.patch("/expense/:id", middlewares_1.isAuthenticated, expense_1.updateExpense);
    router.post("/expense/backup", middlewares_1.isAuthenticated, expense_1.backupExpense);
    router.post("/expense/bkyear", middlewares_1.isAuthenticated, expense_1.backupExpenseYear);
};
//# sourceMappingURL=expense.js.map