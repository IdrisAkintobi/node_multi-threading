import axios from "axios";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { parentPort } from "worker_threads";
import Person from "../model/person.schema";
import logger from "../utils/logger";
import { EntryType, WorkerMem } from "../utils/types";
const mem: WorkerMem = {};

parentPort?.on("message", (data: { url: string }) => {
  fetchData(data.url);
});

const fetchData = (url: string) => {
  const parser = new XMLParser();
  axios
    .get(url, { responseType: "stream", timeout: 10000 })
    .then((response) => {
      logger.info("Fetching data from endpoint...");
      const stream = response.data;
      let data = "";

      stream.on("data", (chunk: string) => {
        data += chunk;
      });
      stream.on("error", (err: unknown) => {
        parentPort?.postMessage("completed");
        logger.error("Error occurred while fetching data", err);
      });

      stream.on("end", () => {
        if (XMLValidator.validate(data)) {
          // Parse the xml data
          const parsedData = parser.parse(data);
          const { sdnList } = parsedData;
          const {
            publishInformation: { Publish_Date, Record_Count },
          } = sdnList;

          // If there is no changes in the data, do not update the database
          // else update the database with the new data and ignore existing data
          if (
            mem["Publish_Date"] === Publish_Date &&
            mem["Record_Count"] === Record_Count
          ) {
            parentPort?.postMessage("completed");
            logger.info("No new data found...");
          } else {
            const { sdnEntry } = sdnList;
            const allData = sdnEntry.map((entry: EntryType) => ({
              uid: entry.uid,
              data: JSON.stringify(entry),
            }));

            // Write data to the database
            Person.bulkCreate(allData, { ignoreDuplicates: true })
              .then(() => {
                mem["Publish_Date"] = Publish_Date;
                mem["Record_Count"] = Record_Count;
                logger.info("Data updated successfully...");
                parentPort?.postMessage("completed");
              })
              .catch((err) => {
                parentPort?.postMessage("completed");
                logger.error("Database failed to write ", err);
              });
          }
        } else {
          parentPort?.postMessage("completed");
          logger.error("Response data is not valid xml");
        }
      });
    })
    .catch((error) => {
      parentPort?.postMessage("completed");
      logger.error("Data not fetched:", error);
    });
};
