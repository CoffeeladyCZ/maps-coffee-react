import { httpGet } from './axiosService';
import { CurrentCafeType } from '../contexts/MapsContext';

export const getCafeDetailData = async (id: string): Promise<CurrentCafeType | void> => {
  let response;
  try {
    response = await httpGet<CurrentCafeType>(id);
    const fetchData = await response.data;
    return fetchData;
  }
  catch (error) {
    console.error(error.message);
  }
}