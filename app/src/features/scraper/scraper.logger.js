// app/src/features/scraper/scraper.logger.js

import logger from "../../utils/logger.js";

const logInfo = (context, msg) => {
  logger.info(`[${context}] ${msg}`);
};

const logWarn = (context, msg) => {
  logger.warn(`[${context}] ${msg}`);
};

const logSuccess = (context, msg) => {
  logger.info(`[${context} ✅] ${msg}`);
};

export default {
  logInfo,
  logWarn,
  logSuccess,
};
