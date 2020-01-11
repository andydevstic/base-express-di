import { Request } from "express";

import { ProvideSingletonWithNamed } from "src/IOC/decorators";
import { TYPES } from "src/IOC/types";
import { NAMES } from "src/IOC/names";

export interface AuthCredentials {
  id: string | number;
  password: string;
}

export interface AuthorizationResponse {
  isAuthenticated: boolean;
  payload?: any;
}

export interface IAuthService {
  authorize(request: Request): AuthorizationResponse;
}

@ProvideSingletonWithNamed(TYPES.Service, NAMES.Authentication)
export class AuthService implements IAuthService {
  constructor() {}

  authorize(req: Request): AuthorizationResponse {
    const authCredentials = <AuthCredentials>req.body;
    if (!authCredentials.id || !authCredentials.password) throw new Error('Missing credentials');
  }
}