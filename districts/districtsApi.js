import { Router } from "express";
import { CircleList, DistList, GeoList, OtherList } from "./districtsService.js";

const router = Router();

router.get("/v1/districts/list", async (req, res, next) => {
  try {
    res.json(await DistList());
  } catch (err) {
    next(err);
  }
});

router.post("/v1/circles/list", async (req, res, next) => {
  try {
    res.json(await CircleList(req.body['dist']));
  } catch (err) {
    next(err);
  }
});

router.post("/v1/other/list", async (req, res, next) => {
  try {
    res.json(await OtherList(req.body['dist'], req.body['circle']));
  } catch (err) {
    next(err);
  }
});

router.get("/v1/geo/list", async (req, res, next) => {
  try {
    res.json(await GeoList());
  } catch (err) {
    next(err);
  }
});

export default router;
