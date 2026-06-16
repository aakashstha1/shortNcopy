import httpResponseCode from "../constants/http-response-code.js";
import httpResponseMessage from "../constants/http-response-message.js";

export const bodyValidator = (schemaDTO) => {
  return async (req, res, next) => {
    try {
      req.body = await schemaDTO.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (exception) {
      const msg = {};
      if (exception.details) {
        exception.details.forEach((error) => {
          const key = error.context?.key || error.context?.label || "field";
          msg[key] = error.message.replace(/['"]/g, "");
        });
      }
      next({
        statusCode: httpResponseCode.BAD_REQUEST,
        status: httpResponseMessage.validationFailed,
        message: "Validation failed",
        detail: msg,
      });
    }
  };
};
