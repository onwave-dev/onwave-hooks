import defaultAxios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

type Data<T> = {
  data: T | null;
  error: AxiosError | null;
  loading: boolean;
};
export const useAxios = <T>(
  opts?: AxiosRequestConfig,
  skip?: boolean,
  axiosInstance = defaultAxios
) => {
  const [config, setConfig] = useState(opts);
  const [state, setState] = useState<Data<T>>({
    loading: false,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);

  const reconfig = (opts: AxiosRequestConfig) => {
    setConfig({ ...config, ...opts });
    setState({ ...state, loading: true });
  };

  const fetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now());
  };

  useEffect(() => {
    const source = defaultAxios.CancelToken.source();
    if (!skip && config) {
      axiosInstance({ ...config, cancelToken: source.token })
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
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [trigger, config, skip]);

  return { ...state, fetch, reconfig };
};
