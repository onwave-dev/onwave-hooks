import defaultAxios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

type Data<T> = {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
};
export const useAxios = <T>(
  opts?: AxiosRequestConfig,
  axiosInstance = defaultAxios
) => {
  const [config, setConfig] = useState(opts);
  const [state, setState] = useState<Data<T>>({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);
  if (!opts?.url) {
    return;
  }
  const post = (opts: AxiosRequestConfig) => {
    setConfig({ ...config, ...opts });
    setState({
      loading: true,
      data: null,
      error: null,
    });
    setTrigger(Date.now());
  };
  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now());
  };
  useEffect(() => {
    if (config) {
      axiosInstance(config)
        .then(({ data }) => {
          setState({
            ...state,
            loading: false,
            data,
          });
        })
        .catch((error) => {
          setState({ ...state, loading: false, error });
        });
    }
  }, [trigger, config]);
  return { ...state, refetch, post };
};
