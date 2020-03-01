import * as JWT from 'jsonwebtoken';
import { inject, named } from 'inversify';

import { ITokenModel, IEnvironmentConfig } from "@src/IOC/interfaces";
import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { TokenError } from '@src/shared/models/errors/token-error';
import { ErrorTypes } from '@src/core/shared/interfaces';
import { MESSAGES } from '@src/core/shared/messages';

@ProvideSingletonWithNamed(TYPES.Model, NAMES.Token)
export class JwtModel<Payload> implements ITokenModel<Payload> {
  constructor(
    @inject(TYPES.Constant)
    @named(NAMES.Env)
    private env: IEnvironmentConfig
  ) {}

  generateToken(payload: Payload, config?: JWT.SignOptions): string {
    try {
      const token = JWT.sign(JSON.stringify(payload), this.env.JwtSecretKey, config);
      return token;
    } catch (error) {
      throw new TokenError(error, 500, ErrorTypes.Internal, { message: MESSAGES.Token.error.TO_ER_002 })
    }
  }
  
  parseToken(token: string, config?: JWT.VerifyOptions): Payload {
    try {
      const decoded = JWT.verify(token, this.env.JwtSecretKey, config);
      return decoded as unknown as Payload;
    } catch (error) {
      throw new TokenError(error, 500, ErrorTypes.Internal, { message: MESSAGES.Token.error.TO_ER_001 })
    }
  }
}