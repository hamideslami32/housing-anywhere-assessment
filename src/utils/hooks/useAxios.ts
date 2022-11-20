import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

interface useAxiosReturnType {
  cancel: () => void;
  data: unknown;
  error: string;
  loaded: boolean;
}

const useAxios = (url: string, method: string, payload?: unknown): useAxiosReturnType => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url,
        });

        setData(response.data);
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        setError(message);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};

export default useAxios;
