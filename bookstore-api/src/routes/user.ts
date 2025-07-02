import { Router } from "express";

import AuthController from "../controllers/auth";

let router = Router();

router.post('/login', AuthController.login);
router.post('/regiser', AuthController.register);

export default router;