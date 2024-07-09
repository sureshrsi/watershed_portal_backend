import { Router } from "express";
import { List, Info, Extent } from "./districtsInfoService.js";

const router = Router();

router.get("/v1/dist/list", async (req, res, next) => {
  try {
    res.json(await List());
  } catch (err) {
    next(err);
  }
});

router.get("/v1/dist/info", async (req, res, next) => {
  try {
    res.json(await Info());
  } catch (err) {
    next(err);
  }
});

router.post("/v1/dist/ext", async (req, res, next) => {
  try {
    res.json(await Extent(req.body));
  } catch (err) {
    next(err);
  }
});

export default router;
