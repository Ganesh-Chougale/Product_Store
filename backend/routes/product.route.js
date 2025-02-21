import express from "express";

import { deleteProduct, getAllProducts, postProduct, updateProduct } from "../Controllers/product.controller.js";

const router = express.Router();

router.post("/", postProduct);          // C
router.get("/", getAllProducts);        // R
router.put("/:id", updateProduct);      // U
router.delete("/:id", deleteProduct);   // D

export default router;