import { GetList, GetInfo, GetExtent } from "./districtsInfoRepository.js";

const List = async () => {
  const list = await GetList();
  return list;
};

const Info = async () => {
  const list = await GetInfo();
  return list;
};

const Extent = async (params) => {
  const list = await GetExtent(params);
  return list;
};

export { List, Info, Extent };
