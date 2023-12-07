import { useCallback, useState } from "react";
import { api } from "../lib/api";

export type MethodType = "get" | "post" | "delete" | "put";

const requestTypes = (method: MethodType) => {
  const requests = {
    get: (url: string) => api.get(url),
    post: (url: string, body?: object) => api.post(url, body),
    delete: (url: string, body?: object, id?: number) => api.delete(`${url}/${id}`),
    put: (url:string, body?: object) => api.put(url, body)
  };

  return requests[method];
};

export function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (method: MethodType, url: string, body?: object, id?: number) => {
      let response;
      try {
        setLoading(true);
        response = await requestTypes(method)(url, body, id);
        setData(response.data.content);
        setLoading(false);
      } catch (error) {
        console.log(error);
        response = null;
        setError("Não foi possivel fazer a requisição.");
        setLoading(false);
      }
      return response;
    },
    []
  );

  return { data, loading, error, request };
}