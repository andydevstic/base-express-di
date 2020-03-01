import { inject, named } from "inversify";

import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { IRDBModel } from "@src/IOC/interfaces";
import { User } from "@src/core/models/user/user";

export interface IUserAuthProfile {
  user: User,
  hashedPassword: string;
}

export interface IUserService {
  getUserForAuthentication(username: string): Promise<IUserAuthProfile>;
}

@ProvideSingletonWithNamed(TYPES.Service, NAMES.User)
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.Db)
    @named(NAMES.User)
    private userRepo: IRDBModel<User>,
  ) { }

  getUserForAuthentication(username: string): Promise<IUserAuthProfile> {
    const foundUser = this.userRepo.getAll({
      field: 'email',
      operator: 'equal',
      value: username
    });
  }

}