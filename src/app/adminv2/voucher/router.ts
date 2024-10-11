import { Router } from "express";
import {
  actionCreate,
  actionDelete,
  index,
  indexCreate,
  actionEdit,
  indexEdit,
} from "./controller";
import { uploadSingle } from "../../../middleware/uploadImage";
import { isLoginAdmin } from "../../../middleware/auth";

const router = Router();

// Rute untuk menampilkan halaman agent
router.get("/",  index);
router.get("/create",  indexCreate);
router.post("/create",  uploadSingle("gameImg"), actionCreate);
router.delete("/delete/:id",  actionDelete);
router.get("/edit/:id",  indexEdit);
router.put("/edit/:id",  uploadSingle("gameImg"), actionEdit);

export default router;
