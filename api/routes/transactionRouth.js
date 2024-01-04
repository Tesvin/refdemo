import express from "express";
import { balance, calculateShares, response } from "../controller/auth.transaction.js";

const router = express.Router();

router.get("/response", response);
//router.get("/userallet/:Id", getBalance);
router.get("/wallet/:userId", balance);
router.get("/calculateShares/:userId", calculateShares);


export default router;