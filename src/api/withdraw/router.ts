import { Router } from "express";
import { isLoginUser } from "../../middleware/auth";
import {   getRequestWithdraw, requestWithdraw } from "./controller";

const router = Router();

router.get("/",  isLoginUser, getRequestWithdraw);
router.post("/",  isLoginUser, requestWithdraw);
export default router;
