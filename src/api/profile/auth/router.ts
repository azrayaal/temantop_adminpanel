import { Router } from "express";
import {
  addBalances,
  checkToken,
  editUser,
  login,
  loginAgent,
  loginIntegrator,
  logout,
  register,
  registerAgent,
} from "./controller";
import { uploadSingle } from "../../../middleware/uploadImage";
import { isLoginUser } from "../../../middleware/auth";

const router = Router();

router.post("/login", login);
router.post("/login/agent", loginAgent);
router.post("/login-integrator", loginIntegrator);
router.post("/logout", isLoginUser, logout);
router.post("/register", uploadSingle("profilePicture"), register);
router.post("/register/agent", uploadSingle("profilePicture"), registerAgent);
router.put("/edit", uploadSingle("profilePicture"), editUser);
router.post("/checkToken", checkToken);
router.post("/addBalance", isLoginUser, addBalances);
export default router;
