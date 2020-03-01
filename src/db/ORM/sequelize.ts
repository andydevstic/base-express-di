import * as sequelize from 'sequelize';
import { Sequelize, QueryInterface } from 'sequelize';
import { inject, named } from 'inversify';

import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { IEnvironmentConfig } from '@src/IOC/interfaces';
import { ErrorTypes } from '@src/core/shared/interfaces';
import { MESSAGES } from '@src/core/shared/messages';
import { DatabaseError } from '@src/shared/models/errors/database-error';

@ProvideSingletonWithNamed(TYPES.Db, NAMES.ORM)
export class SequelizeORM {
  private sequelizeInstance: Sequelize;

  public queryInterface: QueryInterface;

  constructor(
    @inject(TYPES.Constant)
    @named(NAMES.Env)
    env: IEnvironmentConfig
  ) {
    try {
      this.sequelizeInstance = new sequelize.Sequelize({
        host: env.Db_Host,
        password: env.Db_Password,
        port: env.Db_Port,
        username: env.Db_User
      });
      this.queryInterface = this.sequelizeInstance.getQueryInterface();
    } catch (error) {
      throw new DatabaseError(error, 500, ErrorTypes.Internal, { message: MESSAGES.Database.error.DB_ER_001 });
    }
  }

}