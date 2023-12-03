import { httpGet, httpPost } from './axiosService';
import { CafeDetailResponse } from '../types/cafe';

export const getCafeDetailData = async (url: string): Promise<CafeDetailResponse | void> => {
  let response;
  try {
    response = await httpGet<CafeDetailResponse>(url);
    const fetchData = await response.data;
    return fetchData;
  }
  catch (error) {
    console.error(error.message);
  }
}

export const getCafeList = async (url: string) => {
  try {
    const response = await httpGet<CafeDetailResponse[]>(url);
    const fetchData = await response.data;
    return fetchData;
  }
  catch (error) {
    console.error(error.message);
  }
}

export const addNewData = async (data: CafeDetailResponse, url: string) => {
  try {
    const response = await httpPost(url, data);
    const fetchData = await response.data;
    return fetchData;
  } catch (error) {
    console.error(error.message);
  }
}

export const getLocationsData = async () => {
  try {
    const response = await httpGet<{_id: string, locations: string[]}[]>('/locations');
    const fetchData = await response.data;
    return fetchData;
  } catch (error) {
    console.error(error.message);
  }
}