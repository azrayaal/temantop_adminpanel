import { Router } from "express";
import {
  actionCreate,
  actionDelete,
  index,
  indexCreate,
  actionEdit,
  indexEdit,
  changeStatus,
  getUserTransactions,
} from "./controller";
import { uploadSingle } from "../../../middleware/uploadImage";
import { isLoginAdmin } from "../../../middleware/auth";

const router = Router();

// Rute untuk menampilkan halaman agent
router.get("/", index);
router.get("/create", isLoginAdmin, indexCreate);
router.post(
  "/create",
  isLoginAdmin,
  uploadSingle("profilePicture"),
  actionCreate
);
router.delete("/delete/:id", isLoginAdmin, actionDelete);
router.get("/edit/:id", isLoginAdmin, indexEdit);
router.put(
  "/edit/:id",
  isLoginAdmin,

  uploadSingle("profilePicture"),
  actionEdit
);
router.get("/transaction/:id", isLoginAdmin, getUserTransactions);
router.post("/status/:id", isLoginAdmin, changeStatus);

export default router;
