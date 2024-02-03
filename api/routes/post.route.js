import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletpost, getPosts } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletpost);

export default router;
