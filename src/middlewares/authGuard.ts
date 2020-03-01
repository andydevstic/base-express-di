import { inject, named } from "inversify";
import { RequestHandler, NextFunction, Response } from "express";

import { IAuthGuard, ITokenService, IRequest } from "@src/IOC/interfaces";
import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { IHttpRequestHelper, AuthenticationError } from "@src/shared";
import { ErrorTypes } from "@src/core/shared/interfaces";
import { MESSAGES } from "@src/core/shared/messages";

@ProvideSingletonWithNamed(TYPES.Middleware, NAMES.Authentication)
export class AuthGuard implements IAuthGuard {
  constructor(
    @inject(TYPES.Service)
    @named(NAMES.Token)
    private tokenService: ITokenService,

    @inject(TYPES.Util)
    @named(NAMES.HttpRequest)
    private httpRequestHelper: IHttpRequestHelper
  ) {}

  getAuthenticationHandler(): RequestHandler {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const token = this.httpRequestHelper.getAuthToken(req);
        if (!token) { throw new Error('Auth token missing!'); }
        const payload = this.tokenService.parseToken(token);
        req.context = payload;
        next();
      } catch (error) {
        next(new AuthenticationError(error, 401, ErrorTypes.Auth, { message: MESSAGES.Auth.error.AU_ER_001 }));
      }
    }
  }
}