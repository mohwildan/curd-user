import express from "express";
import {
  createProduct,
  deleteProduct,
  findByIdProduct,
  getProduct,
  updateProduct,
} from "../controller/Product.js";

const router = express.Router();

// get all products in database
router.get("/product", getProduct);
// post product in database
router.post("/product", createProduct);
// update product in database
router.patch("/product/:id", updateProduct);
// find product in database
router.get("/product/:id", findByIdProduct);
// delete product in database
router.delete("/product/:id", deleteProduct);

export default router;
