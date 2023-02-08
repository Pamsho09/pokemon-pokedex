import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useReducer } from "react";
type payload = {
  action: "loading" | "error" | "success" | "reset";
  data: any;
};

const useFetch = (request: AxiosRequestConfig, isSubmit?: boolean) => {
  const [response, setResponse] = useReducer(
    (state, payload: payload) => {
      switch (payload.action) {
        case "loading":
          return {
            ...state,
            loading: true,
          };
        case "error":
          return {
            ...state,

            error: payload.data,
            loading: false,
          };
        case "success":
          return {
            ...state,
            error: null,

            data: payload.data,
            loading: false,
          };
        case "reset":
          return {
            ...state,
            error: null,
            data: null,
            loading: false,

          }
      }
    },
    {
      data: null,
      loading: false,
      error: null,
    }
  );
  const fetchData = async () => {
    setResponse({ action: "loading", data: null });
    try {
      const res = await axios(request);
      setResponse({ action: "success", data: res.data });
    } catch (error) {
      setResponse({ action: "error", data: error });
    }
  };
  useEffect(() => {
    !isSubmit && fetchData();
  }, [request]);

  const handleResquest = () => {
    fetchData();
  };
  const reset = () => {
    setResponse({ action: "reset", data: null });
  }
  return { response, handleResquest ,reset};
};

export default useFetch;
