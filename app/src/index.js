// app/src/index.js
import runScraper from "./features/scraper/scraper.controller.js";
import exportToExcel from "./features/excel/excel.controller.js";
import { saveProgress, loadProgress } from "./utils/saveProgress.js";
import logger from "./utils/logger.js";
import config from "./config/app.config.js";

logger.info("======");

const { start, end } = config.refRange;
const total = end - start + 1;
logger.info(`[LOAD ⚙️ ] ${start} → ${end} (${total})`);

let currentData = loadProgress();

process.on("SIGINT 🚫", () => {
  logger.error(
    "error : ", error
  );
  saveProgress(currentData);
  process.exit(1);
});

const main = async () => {
  try {
    const extratorData = await runScraper();

    currentData = [...currentData, ...extratorData];
    logger.info(
      `[BACKUP ℹ️ ] ${currentData.length}`
    );

    await exportToExcel(currentData);
  } catch (error) {
    logger.error("Error", error);
    saveProgress(currentData);
  } finally {
    logger.info("[SAVE 🔄️]");
    saveProgress(currentData);
    logger.info("======");
  }
};

main();
