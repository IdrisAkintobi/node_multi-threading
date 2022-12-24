import { join } from "path";
import { Worker } from "worker_threads";
import { memory } from "../controllers/fetchData";
import logger from "./logger";

const worker = new Worker(join(__dirname, "worker.js"));

worker.on("message", (message) => {
  // Update the memory object;
  memory["status"] = message;
});

worker.on("error", (error) => {
  memory["status"] = "completed";
  logger.error(error);
});

worker.on("exit", (code) => {
  memory["status"] = "completed";
  if (code !== 0) {
    logger.error(`Worker stopped with exit code ${code}`);
  }
});

export default worker;
