import { Request } from "express";

import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { TokenError } from "@src/shared/models/errors/token-error";
import { ErrorTypes } from "@src/core/shared/interfaces";
import { MESSAGES } from "@src/core/shared/messages";


export interface IHttpRequestHelper {
  getAuthToken(req: Request): string;
}

@ProvideSingletonWithNamed(TYPES.Util, NAMES.HttpRequest)
export class HttpRequestHelper implements IHttpRequestHelper {
  getAuthToken(req: Request): string {
    if (req.query.token) return req.query.token;
    if (req.headers.authorization) return req.headers.authorization.split(' ')[1];

    throw new TokenError(400, ErrorTypes.Auth, { message: MESSAGES.Token.error.TO_ER_003 })
  }
}