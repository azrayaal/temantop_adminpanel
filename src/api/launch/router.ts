import { Router } from "express";
import { launchLobby, launchStream } from "./controller";
import { isLoginUser } from "../../middleware/auth";

const router = Router();

router.get("/stream/:id", isLoginUser, launchStream);
router.get("/lobby", isLoginUser, launchLobby);

export default router;
