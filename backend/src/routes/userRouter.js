import express from "express";
import { refreshToken } from "../controller/RefreshToken.js";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "../controller/Users.js";
import { verifyToken } from "../middelware/verifyToken.js";

const router = express.Router();

// get all users in database
router.get("/users", verifyToken, getUser);
// post user in database
router.post("/users", createUser);
// login user in database
router.post("/login", loginUser);
// logout user in database
router.delete("/logout", logoutUser);
// get token for refresh token in database
router.get("/token", refreshToken);

export default router;
