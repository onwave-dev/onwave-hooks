import defaultAxios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

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

  const post = useCallback(
    async (opts: AxiosRequestConfig) => {
      try {
        const request = await axiosInstance({ ...config, ...opts });
        return { request: request, error: null };
      } catch (e) {
        return { request: null, error: e };
      }
    },
    [config]
  );

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

  return { ...state, fetch, reconfig, post };
};
