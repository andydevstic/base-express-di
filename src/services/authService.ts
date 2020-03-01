import { named, inject } from "inversify";

import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { ITokenService, IRDBModel, BasicWhereOperators, BasicFilterValues, IStringHashModel } from "@src/IOC/interfaces";
import { CustomError, AuthenticationError } from "@src/shared";
import { AuthPayload, ErrorTypes } from "@src/core/shared/interfaces";
import { USER_TYPES, User } from "@src/core/models/user/user";
import { MESSAGES } from "@src/core/shared/messages";
import { IUserService } from "./userService";

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
    private tokenService: ITokenService,

    @inject(TYPES.Db)
    @named(NAMES.User)
    private userRepo: IRDBModel<User>,

    @inject(TYPES.Model)
    @named(NAMES.StringHash)
    private hashModel: IStringHashModel
  ) {}

  async authenticateToken(token: string): Promise<AuthPayload> {
    const payload = this.tokenService.parseToken(token);
    return payload;
  }

  async authenticateCredential(username: string, password: string): Promise<AuthPayload> {
    const foundUser = await this.userRepo.getAll({

    })
    if (!foundUser) throw new AuthenticationError(null, 401, ErrorTypes.Auth, { message: MESSAGES.Auth.error.AU_ER_003 });

    const checkPasswordResult = await this.hashModel.compare(password, foundUser.hashedPassword);
    if (!checkPasswordResult) {}

    return <AuthPayload> { user: foundUser.user };
  }
}