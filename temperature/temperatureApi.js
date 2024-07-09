import { Router } from "express";
import { List, Current } from "./temperatureService.js";

const router = Router();

router.post("/v1/temperature", async (req, res, next) => {
  try {
    res.json(await Current(req.body['dist']));
  } catch (err) {
    next(err);
  }
});

router.get("/v1/temperature/list", async (req, res, next) => {
  try {
    res.json(await List());
  } catch (err) {
    next(err);
  }
});

export default router;
