import { Request, Response } from "express";
import { AppMem } from "../utils/types";
import worker from "../utils/workerInstance";
export const memory: AppMem = {};

const fetchData = async (_: Request, res: Response) => {
  if (memory["status"] === "processing") {
    return res.status(202).json({ message: "Operation is processing..." });
  }
  // Set status to processing
  memory["status"] = "processing";
  const url = "https://www.treasury.gov/ofac/downloads/sdn.xml";

  // Send url to the worker thread
  worker.postMessage({ url });

  res.status(200).json({ message: "Operation started..." });
};

export { fetchData };
