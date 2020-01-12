import { inject, named } from "inversify";

import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { ITokenService, ITokenModel } from "@src/IOC/interfaces";
import { CustomError } from "@src/shared";
import { AuthPayload } from "@src/core/shared/interfaces";


@ProvideSingletonWithNamed(TYPES.Service, NAMES.Token)
export class TokenService implements ITokenService {
  constructor(
    @inject(TYPES.Model)
    @named(NAMES.Token)
    private tokenModel: ITokenModel<AuthPayload>
  ) {}

  parseToken(authToken: string): AuthPayload {
    try {
      const payload = this.tokenModel.parseToken(authToken);
      return payload;
    } catch (error) {
      CustomError.throwCustomError(error);
    }
  }
}