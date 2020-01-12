import { named, inject } from "inversify";

import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { ITokenService } from "@src/IOC/interfaces";
import { CustomError } from "@src/shared";
import { AuthPayload } from "@src/core/shared/interfaces";

export interface AuthCredentials {
  id: string | number;
  password: string;
}

export interface AuthorizationResponse {
  isAuthenticated: boolean;
  payload?: any;
}

export interface IAuthService {
  authenticateCredential(username: string, password: string): Promise<AuthPayload>;
  authenticateToken(token: string): Promise<AuthPayload>;
}

@ProvideSingletonWithNamed(TYPES.Service, NAMES.Authentication)
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.Service)
    @named(NAMES.Token)
    private tokenService: ITokenService
  ) {}

  async authenticateToken(token: string): Promise<AuthPayload> {
    try {
      const payload = this.tokenService.parseToken(token);
      return payload;
    } catch (error) {
      CustomError.throwCustomError(error);
    }
  }

  async authenticateCredential(username: string, password: string): Promise<AuthPayload> {
    const samplePayload: AuthPayload = {
      user: {
        id: 1,
        firstName: 'Huy',
        lastName: 'Tran',
        email: 'huy.thevip@gmail.com',
        userType: 'admin',
        status: 1
      }
    };

    return samplePayload;
  }
}