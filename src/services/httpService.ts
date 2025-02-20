import * as axios from 'axios';

import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { IHttpModel } from "@src/IOC/interfaces";

@ProvideSingletonWithNamed(TYPES.Service, NAMES.Http)
export class AxiosHttpService implements IHttpModel {
  private _httpModule: IHttpModel;
  constructor() {
    this._httpModule = axios.default;
  }

  get(url: string, config?: axios.AxiosRequestConfig) {
    return this._httpModule.get(url, config)
  }

  post(url: string, config?: axios.AxiosRequestConfig) {
    return this._httpModule.post(url, config)
  }

  put(url: string, config?: axios.AxiosRequestConfig) {
    return this._httpModule.put(url, config)
  }

  delete(url: string, config?: axios.AxiosRequestConfig) {
    return this._httpModule.delete(url, config)
  }
}