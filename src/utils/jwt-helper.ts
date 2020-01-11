import * as JWT from 'jsonwebtoken';

import { ITokenHelper, IEnvironmentConfig } from "src/IOC/interfaces";
import { ProvideSingletonWithNamed } from "src/IOC/decorators";
import { TYPES } from "src/IOC/types";
import { NAMES } from "src/IOC/names";
import { inject, named } from 'inversify';

@ProvideSingletonWithNamed(TYPES.Util, NAMES.Token)
export class JwtHelper<Payload> implements ITokenHelper<Payload> {
  constructor(
    @inject(TYPES.Constant)
    @named(NAMES.Env)
    private env: IEnvironmentConfig
  ) {}

  generateToken(payload: Payload, config: JWT.SignOptions): string {
    const token = JWT.sign(JSON.stringify(payload), this.env.authSecretKey, config)
  }
}