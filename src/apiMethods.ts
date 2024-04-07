import { httpGet, httpPost, httpPatch } from './Utils/axiosService';
import { CafeDetailResponse } from './types/cafe';

export const getCafeDetailData = async (url: string): Promise<CafeDetailResponse | void> => {
  const response = await httpGet<CafeDetailResponse>(url);
  const fetchData = await response.data;
  return fetchData;
}

export const getCafeList = async (url: string) => {
  const response = await httpGet<CafeDetailResponse[]>(url);
  const fetchData = await response.data;
  return fetchData;
}

export const addNewData = async (data: CafeDetailResponse, url: string) => {
  const response = await httpPost(url, data);
  const fetchData = await response.data;
  return fetchData;
}

export const updateCafeDetailData = async (data: CafeDetailResponse, url: string) => {
  const response = await httpPatch(url, data);
  const fetchData = await response.data;
  return fetchData;
}

export const getLocationsData = async () => {
  const response = await httpGet<{_id: string, locations: string[]}[]>('/api/locations');
  const fetchData = await response.data;
  return fetchData;
}