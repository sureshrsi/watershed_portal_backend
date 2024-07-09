import { GetDistList, GetCircleList, GetOtherList, GetGeoList } from "./districtsRepository.js";

const DistList = async () => {
  const list = await GetDistList();
  return list;
};

const CircleList = async (dist) => {
  const list = await GetCircleList(dist);
  return list;
};

const OtherList = async (dist, circle) => {
  const list = await GetOtherList(dist, circle);
  return list;
};

const GeoList = async () => {
  const list = await GetGeoList();
  return list;
};

export { DistList, CircleList, OtherList, GeoList };