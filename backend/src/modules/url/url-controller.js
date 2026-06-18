import httpResponseMessage from "../../constants/http-response-message.js";
import { urlSvc } from "./url-service.js";

class UrlController {
  createShortUrl = async (req, res, next) => {
    try {
      const url = await urlSvc.createShortUrl(req.body);

      res.json({
        status: httpResponseMessage.success,
        message: "Short URL created successfully",
        data: url,
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  redirectToOriginalUrl = async (req, res, next) => {
    try {
      const { shortCode } = req.params;

      const url = await urlSvc.getUrlByShortCode(shortCode);

      return res.redirect(url.originalUrl);
    } catch (exception) {
      next(exception);
    }
  };
}

export const urlCtrl = new UrlController();
