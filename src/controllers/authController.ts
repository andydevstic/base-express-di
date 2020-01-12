import { Request, Response, NextFunction } from "express";
import { inject, named } from "inversify";

import { ProvideWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { IAuthService } from "@src/services/authService";
import { IAuthCredential, ITokenModel } from "@src/IOC/interfaces";
import { AuthenticationError, CustomError } from "@src/shared";
import { ErrorTypes, ILoginResponse, AuthPayload } from "@src/core/shared/interfaces";
import { MESSAGES } from "@src/core/shared/messages";

export interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): void
}

@ProvideWithNamed(TYPES.Controller, NAMES.Authentication)
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.Service)
    @named(NAMES.Authentication)
    private authService: IAuthService,

    @inject(TYPES.Model)
    @named(NAMES.Token)
    private tokenModel: ITokenModel<AuthPayload>
  ) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = <IAuthCredential>req.body;
      if (!username || !password) { throw new AuthenticationError(400, ErrorTypes.Auth, { message: MESSAGES.Auth.error.AU_ER_002 }); }

      const payload = await this.authService.authenticateCredential(username, password);
      const token = this.tokenModel.generateToken(payload);
      res.status(200).json(<ILoginResponse> {
        success: true,
        token,
        payload
      })
    } catch (error) {
      next(CustomError.throwCustomError(error));
    }
  }
}