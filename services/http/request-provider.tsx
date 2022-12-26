import React, { useEffect, useMemo, useState } from "react";
import axios, { type AxiosRequestConfig, type AxiosInstance } from "axios";
import { BaseResponse } from "../../types";

interface RequestServiceContextValuesType {
  instance: AxiosInstance;
  config: AxiosRequestConfig;
  setRequestConfig: React.Dispatch<
    React.SetStateAction<AxiosRequestConfig<any>>
  >;
}

interface RequestServiceProviderProps {
  children: JSX.Element;
  config?: AxiosRequestConfig;
}

const createRequestService = (
  config: AxiosRequestConfig
): Omit<RequestServiceContextValuesType, "setRequestConfig"> => {
  return {
    instance: axios.create(config),
    config,
  };
};

export const RequestServiceContext =
  React.createContext<RequestServiceContextValuesType | null>(null);

const RequestServiceProvider: React.FC<RequestServiceProviderProps> = ({
  children,
  ...props
}) => {
  const [config, setConfig] = useState<AxiosRequestConfig>({});

  useEffect(() => {
    setConfig(props.config || {});
  }, [props.config]);

  const service = useMemo(
    () => ({ ...createRequestService(config), setRequestConfig: setConfig }),
    [config, setConfig]
  );

  return (
    <RequestServiceContext.Provider value={service}>
      {children}
    </RequestServiceContext.Provider>
  );
};

export default RequestServiceProvider;
