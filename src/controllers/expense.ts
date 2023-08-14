import express from "express";

import { deleteExpenseById, getExpense, getExpenseById } from "../db/expense";
import { dropMongoDBTable } from "../utils/dropTable";
import { backupAccountData } from "../utils/firebaseBackup";
import { transferData } from "../utils/transferData";

export const getAllExpense = async (req: express.Request, res: express.Response) => {
  try {
    const expense = await getExpense();

    return res.status(200).json(expense);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteExpense = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteExpenseById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateExpense = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.sendStatus(400);
    }

    const user = await getExpenseById(id);

    user.date = date;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
/**
 * Backup from firebase data & transfer data to mongodb
 * @param req
 * @param res
 */
export const backupExpense = async (req: express.Request, res: express.Response) => {
  const { status } = req.body;
  try {
    if (status) {
      await dropMongoDBTable();
      const response2023 = await backupAccountData("Account2023");

      await transferData(response2023);

      return res
        .status(200)
        .json({
          message: "Backup & transfer successfully",
        })
        .end();
    } else {
      return res
        .status(204)
        .json({
          message: "Update data failed coz status is false",
        })
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
