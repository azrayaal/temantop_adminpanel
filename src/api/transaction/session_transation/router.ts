import { Router } from "express";
import {
  createSessionTransaction,
  getSessionTransactions,
} from "./controller";
import { isLoginUser } from "../../../middleware/auth";

const router = Router();

router.post("/", isLoginUser, getSessionTransactions); //done
router.post("/pay", isLoginUser, createSessionTransaction); //done

export default router;
