import District from "./districtsModel.js";
import Circle from "./circlesModel.js";
import { Op, Sequelize } from "sequelize";
import Grid from "./gridModel.js";
import SettlementPoint from "./settlementPointModel.js";
import Watershed from "./watershedModel.js";

const GetDistList = async () => {
  let list = await District.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("dist")), "dist"], "point_y", "point_x"],
    where: {
      dist: ["Namsai District", "Tawang District", "Lower Subansiri District"],
    },
    order: [["dist", "ASC"]],
    raw: true,
  });
  return list
    ? list.map((result) => {
        let localObj = {};
        localObj["value"] = result.dist;
        localObj["label"] = result.dist;
        localObj["lat"] = result.point_y;
        localObj["long"] = result.point_x;
        return localObj;
      })
    : null;
};

const GetCircleList = async (dist) => {
  let list = await Circle.findAll({
    attributes: ["cir_name", "circle_id"],
    order: [["cir_name", "ASC"]],
    where: {
      dist_name: dist,
    },
    raw: true,
  });
  return list
    ? list.map((result) => {
        let localObj = {};
        localObj["value"] = result.circle_id;
        localObj["label"] = result.cir_name;
        return localObj;
      })
    : null;
};

const GetOtherList = async (dist, circle) => {
  let otherList = {
    grids: [],
    watersheds: [],
    settlements: [],
  };
  //Grid
  let glist = await Grid.findAll({
    attributes: [Sequelize.fn("DISTINCT", Sequelize.col("grid_no"))],
    order: [["grid_no", "ASC"]],
    where: {
      [Op.and]: [
        { circle_id: circle.toString() },
        {
          grid_no: {
            [Op.ne]: null,
          },
        },
      ],
    },
    raw: true,
  });
  otherList.grids = glist
    ? glist.map((result) => {
        let localObj = {};
        localObj["value"] = result.grid_no;
        localObj["label"] = result.grid_no;
        return localObj;
      })
    : [];
  //SettlementPoint
  let slist = await SettlementPoint.findAll({
    attributes: [Sequelize.fn("DISTINCT", Sequelize.col("name"))],
    order: [["name", "ASC"]],
    where: {
      [Op.and]: [
        { cir_id: circle.toString() },
        {
          name: {
            [Op.ne]: null,
          },
        },
      ],
    },
    raw: true,
  });
  otherList.settlements = slist
    ? slist.map((result) => {
        let localObj = {};
        localObj["value"] = result.name;
        localObj["label"] = result.name;
        return localObj;
      })
    : [];
  //Watershed
  let wlist = await Watershed.findAll({
    attributes: [Sequelize.fn("DISTINCT", Sequelize.col("mini_whed"))],
    order: [["mini_whed", "ASC"]],
    where: {
      [Op.and]: [
        { circle_id: circle.toString() },
        {
          mini_whed: {
            [Op.ne]: null,
          },
        },
      ],
    },
    raw: true,
  });
  otherList.watersheds = wlist
    ? wlist.map((result) => {
        let localObj = {};
        localObj["value"] = result.mini_whed;
        localObj["label"] = result.mini_whed;
        return localObj;
      })
    : [];
  return otherList;
};

const GetGeoList = async () => {
  let list = await District.findAll({
    attributes: ["geom"],
    raw: true,
  });
  return list
    ? list.map((result) => {
        return result["geom"];
      })
    : [];
};

export { GetDistList, GetCircleList, GetOtherList, GetGeoList };
