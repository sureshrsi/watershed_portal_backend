import { GetList, GetCurrent } from "./temperatureRepository.js";

const Current = async (dist) => {
  const list = await GetCurrent(dist);
  return list;
};

const List = async () => {
  const list = await GetList();
  return list;
};

export { List, Current };
