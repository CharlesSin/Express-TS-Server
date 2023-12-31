import express from "express";

import authentication from "./authentication";
import users from "./users";
import expense from "./expense";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  expense(router);

  return router;
};
