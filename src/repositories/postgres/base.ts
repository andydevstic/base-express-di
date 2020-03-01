import { injectable } from "inversify";

import { IRDBModel, WhereOperators, FilterValues, IDbAdapter, IQueryHelper, IObjectHelper, IObject } from "@src/IOC/interfaces";
import { ICriteria, PaginateResponse, ILogger } from "@src/core/shared/interfaces";

@injectable()
export class PostgresBaseRepo<DbModel> implements IRDBModel<DbModel> {
  constructor(
    protected queryHelper: IQueryHelper,
    protected databaseAdapter: IDbAdapter,
    protected objectHelper: IObjectHelper,
    protected logger: ILogger,
    ) {}

  async paginate(limit: number, page: number, criteria?: ICriteria<WhereOperators, FilterValues>): Promise<PaginateResponse<DbModel>> {
    const result = <PaginateResponse<DbModel>>{
      limit,
      page,
      data: [],
      totalCount: 0
    };

    try {
      result.totalCount = await this.databaseAdapter.query(
        this.queryHelper.countAll(criteria),
        criteria.filter.map(i => i.value)
      );
  
      result.data = await this.databaseAdapter.query(
        this.queryHelper.paginate(limit, page, criteria),
        criteria.filter.map(i => i.value)
      );
    } catch (error) {
      this.logger.error(error);
    } finally {
      return result;
    }
  }

  async getAll(criteria?: ICriteria<WhereOperators, FilterValues>): Promise<DbModel[]> {
    let result: DbModel[] = [];
    try {
      result = await this.databaseAdapter.query(
        this.queryHelper.getAll(criteria),
        criteria.filter.map(i => i.value)
      );
    } catch (error) {
      this.logger.error(error);
    } finally {
      return result;
    }
  }

  async getById(id: number | string, criteria?: ICriteria<WhereOperators, FilterValues>): Promise<DbModel> {
    let result: DbModel = null;
    try {
      result = await this.databaseAdapter.query(
        this.queryHelper.getById(criteria),
        id
      );
    } catch (error) {
      this.logger.error(error);
    } finally {
      return result;
    }
  }

  async create(modelData: IObject): Promise<DbModel> {
    let result: DbModel = null;
    const modelColumns = this.objectHelper.getKeysFromObject(modelData);
    try {
      result = await this.databaseAdapter.query(
        this.queryHelper.create(modelColumns),
        ...modelColumns.map(col => modelData[col])
      );
    } catch (error) {
      this.logger.error(error);
    } finally {
      return result;
    }
  }

  

}