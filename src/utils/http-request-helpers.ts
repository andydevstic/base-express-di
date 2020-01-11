import { Request } from "express";
import { ProvideSingletonWithNamed } from "src/IOC/decorators";
import { TYPES } from "src/IOC/types";
import { NAMES } from "src/IOC/names";


export interface IHttpRequestHelper {
  getAuthToken(req: Request): string;
}

@ProvideSingletonWithNamed(TYPES.Util, NAMES.HttpRequest)
export class HttpRequestHelper implements IHttpRequestHelper {
  getAuthToken(req: Request): string {
    const token = null;
    if (req.query.token) return req.query.token;
    if (req.headers.authorization) return req.headers.authorization.split(' ')[1];

    return token;
  }
}