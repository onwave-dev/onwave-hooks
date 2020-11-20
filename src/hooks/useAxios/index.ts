import defaultAxios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

type Data<T> = {
  data?: T;
  error?: AxiosError;
  loading: boolean;
};
export const useAxios = <T>(
  opts: AxiosRequestConfig,
  axiosInstance = defaultAxios
) => {
  const [config, setConfig] = useState(opts);
  const [state, setState] = useState<Data<T>>({
    loading: true,
    error: undefined,
    data: undefined,
  });
  const [trigger, setTrigger] = useState(0);
  if (!opts.url) {
    return;
  }
  const post = (opts: AxiosRequestConfig) => {
    setConfig(opts);
    setState({
      loading: true,
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
  }, [trigger]);
  return { ...state, refetch, post };
};
