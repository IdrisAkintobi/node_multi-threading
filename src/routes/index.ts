import { Router } from "express";
import { fetchData } from "../controllers/fetchData";
import { fetchDataStatus, getPeople, getPerson } from "../controllers/getData";
const router = Router();

router.post("/update-db", fetchData);
router.get("/update-db-status", fetchDataStatus);
router.get("/person/:uid", getPerson);
router.get("/people", getPeople);

export default router;
