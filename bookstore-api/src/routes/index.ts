import authRoutes from './user';
import booksRoutes from './book';
import {Router } from "express";
let router = Router();
router.use(authRoutes);
router.use(booksRoutes);

export default router;