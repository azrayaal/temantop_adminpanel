import { Router } from "express";
import { redeemVoucher } from "./controller";
import { isLoginUser } from "../../middleware/auth";

const router = Router();

router.post("/", isLoginUser, redeemVoucher);
export default router;
