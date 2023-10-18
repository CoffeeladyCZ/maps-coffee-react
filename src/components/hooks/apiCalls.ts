import { useState } from 'react';
import axios from 'axios';
import { FormValues } from '../../types';

export const usePostApi = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const baseURL = `http://localhost:5000/api/cafe`

  const addNewData = async (data: FormValues, url: string) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseURL}${url}`, data);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { addNewData, data, isLoading, error };
}