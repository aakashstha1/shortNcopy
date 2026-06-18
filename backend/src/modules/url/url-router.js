import express from "express";
import { bodyValidator } from "../../middlewares/request-validator-middleware.js";
import { createShortUrlDTO } from "./url-request.js";
import { urlCtrl } from "./url-controller.js";

const urlRouter = express.Router();

urlRouter.post(
  "/create",
  bodyValidator(createShortUrlDTO),
  urlCtrl.createShortUrl,
);

export default urlRouter;
