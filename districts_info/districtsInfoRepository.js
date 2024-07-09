import { QueryTypes } from "sequelize";
import District from "./districtsInfoModel.js";
import getConnection from "../db/db.js";

const GetList = async () => {
  let list = await District.findAll({
    attributes: ["district_name", "head_quarters"],
    raw: true,
  });
  return list ? list : null;
};

const GetInfo = async () => {
  let list = await District.findAll({
    attributes: [
      "district_name",
      "head_quarters",
      "population",
      "geographical_area",
      "no_of_circles",
      "no_of_blocks",
      "no_of_revenue_villages",
      "present_agriculture_area",
    ],
    raw: true,
  });
  return list ? list : null;
};

const GetExtent = async (params) => {
  const sequelize = await getConnection();
  //watershed, grid, settlement
  let whereCondition = "";
  let tableName = "namsaicircle";
  if(params.grid) {
    tableName = "namsai_grid_union";
    whereCondition = tableName +".dist_name = '"+ params.district +"' AND "+ tableName +".circle_id = '"+ params.circle +"' AND " + tableName + ".grid_no = '" + params.grid +"'";
  } else if(params.watershed){
    tableName = "namsai_watershed_union";
    whereCondition = tableName +".dist_name = '"+ params.district +"' AND "+ tableName +".circle_id = '"+ params.circle +"' AND " + tableName + ".mini_whed = '" + params.watershed +"'";
  } else if(params.settlement){
    //dist_name, circle_id, cir_name doesn't exist in settlement table
    tableName = "namsai_settlement_point_update";
    whereCondition = tableName +".cir_id = '"+ params.circle +"' AND " + tableName + ".name = '" + params.settlement +"'";
  } else {
    tableName = "namsaicircle";
    whereCondition = tableName +".dist_name = '"+ params.district +"' AND "+ tableName +".circle_id = '"+ params.circle +"'";
  }
  //Group by logic
  /*
      group by \
      "+ tableName +".circle_id, \
      "+ tableName +".cir_name \
      order by \
      "+ tableName +".cir_name
   */
  let list = sequelize.query(
    "SELECT \
        ST_Extent("+ tableName +".geom) ext \
      FROM \
      "+ tableName +" \
      where \
      "+ whereCondition +";",
    {
      type: QueryTypes.SELECT,
      raw: true,
    }
  );
  return list ? list : null;
};

export { GetList, GetInfo, GetExtent };
