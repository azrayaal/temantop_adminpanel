import { Router } from "express";
import { isLoginUser } from "../../middleware/auth";
import { getBank } from "./controller";

const router = Router();

router.get("/",  isLoginUser, getBank);
export default router;
