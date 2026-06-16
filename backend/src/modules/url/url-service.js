import crypto from "crypto";
import dotenv from "dotenv";
import { urlModel } from "./url-model.js";
import httpResponseCode from "../../constants/http-response-code.js";
import httpResponseMessage from "../../constants/http-response-message.js";

dotenv.config({ quiet: true });

class UrlService {
  generateShortCode = (length = 6) => {
    return crypto
      .randomBytes(length)
      .toString("base64")
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, length);
  };

  createShortUrl = async (data) => {
    try {
      const originalUrl = data.originalUrl;

      const matchOriginalUrl = await urlModel.findOne({
        originalUrl,
      });

      if (matchOriginalUrl) {
        return matchOriginalUrl;
      }

      let shortCode = this.generateShortCode();

      while (await urlModel.findOne({ shortCode })) {
        shortCode = this.generateShortCode();
      }

      const baseUrl = process.env.BACKEND_URL;

      const shortUrl = `${baseUrl}/${shortCode}`;

      const payload = {
        originalUrl,
        shortCode,
        shortUrl,
      };

      const newUrl = new urlModel(payload);

      return await newUrl.save();
    } catch (exception) {
      throw exception;
    }
  };

  getUrlByShortCode = async (shortCode) => {
    try {
      const url = await urlModel.findOne({ shortCode });

      if (!url) {
        throw {
          statusCode: httpResponseCode.NOT_FOUND,
          status: httpResponseMessage.notFound,
          message: "URL not found",
        };
      }

      return url;
    } catch (exception) {
      throw exception;
    }
  };
}

export const urlSvc = new UrlService();
