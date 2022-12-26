import { useContext } from "react";
import { BaseResponse } from "../../types";
import { RequestServiceContext } from "./request-provider";

const COMMON_ERROR = new Error("请求方法调用错误");

const http = {
  get: <T, P = any>(url: string, params?: P) => {
    const instance = useContext(RequestServiceContext)!.instance;
    if (!instance) {
      throw COMMON_ERROR;
    }
    return new Promise<[unknown, BaseResponse<T> | null]>((resolve) => {
      instance
        .get(url, {
          params,
        })
        .then((res) => {
          resolve([null, res.data]);
        })
        .catch((error) => {
          resolve([error, null]);
        });
    });
  },
  post: <T, D = any>(url: string, data?: D) => {
    const instance = useContext(RequestServiceContext)!.instance;
    if (!instance) {
      throw COMMON_ERROR;
    }
    return new Promise<[unknown, BaseResponse<T> | null]>((resolve) => {
      instance
        .post(url, data)
        .then((res) => {
          resolve([null, res.data]);
        })
        .catch((error) => {
          resolve([error, null]);
        });
    });
  },
  put: <T, D = any>(url: string, data?: D) => {
    const instance = useContext(RequestServiceContext)!.instance;
    if (!instance) {
      throw COMMON_ERROR;
    }
    return new Promise<[unknown, BaseResponse<T> | null]>((resolve) => {
      instance
        .put(url, data)
        .then((res) => {
          resolve([null, res.data]);
        })
        .catch((error) => {
          resolve([error, null]);
        });
    });
  },
  delete: <T, P = any>(url: string, params?: P) => {
    const instance = useContext(RequestServiceContext)!.instance;
    if (!instance) {
      throw COMMON_ERROR;
    }
    return new Promise<[unknown, BaseResponse<T> | null]>((resolve) => {
      instance
        .delete(url, { params })
        .then((res) => {
          resolve([null, res.data]);
        })
        .catch((error) => {
          resolve([error, null]);
        });
    });
  },
};

export default http;
