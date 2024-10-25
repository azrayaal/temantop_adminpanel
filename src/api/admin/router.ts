import { Router } from "express";
import {
    createAdmin,
} from "./controller";

const router = Router();

router.post("/", createAdmin);

export default router;
