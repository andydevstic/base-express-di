import pgAdapter, { Client } from 'pg';

import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { inject, named } from 'inversify';
import { IEnvironmentConfig, IDbAdapter } from '@src/IOC/interfaces';
import { DatabaseError } from '@src/shared/models/errors/database-error';
import { ErrorTypes } from '@src/core/shared/interfaces';
import { MESSAGES } from '@src/core/shared/messages';

@ProvideSingletonWithNamed(TYPES.Adapter, NAMES.Database)
export class PostgresAdapter implements IDbAdapter {
  public dbClient: Client;

  constructor(
    @inject(TYPES.Constant)
    @named(NAMES.Env)
    private env: IEnvironmentConfig
  ) {}

  async connect(): Promise<void> {
    try {
      this.dbClient = new pgAdapter.Client({
        host: this.env.Db_Host,
        password: this.env.Db_Password,
        port: this.env.Db_Port,
        user: this.env.Db_User
      });
      await this.dbClient.connect();
    } catch (error) {
      throw new DatabaseError(error, 500, ErrorTypes.Internal, { message: MESSAGES.Database.error.DB_ER_001 });
    }
  }

  query(sql: string, data: any[]): Promise<any> {
    return this.dbClient.query(sql, data);
  }

  
}