import express from "express";
import urlRouter from "../modules/url/url-router.js";
import { urlCtrl } from "../modules/url/url-controller.js";
import paymetnRouter from "../modules/payment/payment-router.js";

const router = express.Router();

router.use("/url", urlRouter);
// router.use("/payment", paymetnRouter);

router.get("/:shortCode", urlCtrl.redirectToOriginalUrl);

export default router;
