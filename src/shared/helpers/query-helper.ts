import { ProvideWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names"
import { IQueryHelper, WhereOperators, FilterValues } from "@src/IOC/interfaces";
import { ICriteria, IFilter, IOrderBy, ErrorTypes } from "@src/core/shared/interfaces";
import { DatabaseError } from "../models/errors/database-error";
import { MESSAGES } from "@src/core/shared/messages";

@ProvideWithNamed(TYPES.Helper, NAMES.Query)
export class QueryHelper implements IQueryHelper {
  private tableName: string;
  constructor() {}

  private get tableId(): string {
    return `${this.tableName}_id`;
  }

  paginate(limit: number, page: number, criteria?: ICriteria<WhereOperators, FilterValues>): string {
    if (limit < 1 || page < 1) throw new DatabaseError(null, 400, ErrorTypes.Params, { message: MESSAGES.Database.error.DB_ER_002 });

    const offset = (page - 1) * limit;
    const query = `
      SELECT ${this.parseSelect(criteria.select)}
      FROM ${this.tableName}
      WHERE TRUE
        ${this.parseWhere(criteria.filter)}
      LIMIT ${limit}
      OFFSET ${offset}
      ORDER BY ${this.parseOrderBy(criteria.orderBy)};
    `

    return query;
  }

  getAll(criteria?: ICriteria<WhereOperators, FilterValues>): string {
    const query = `
      SELECT ${this.parseSelect(criteria.select)}
      FROM ${this.tableName}
      WHERE TRUE
        ${this.parseWhere(criteria.filter)}
      ORDER BY ${this.parseOrderBy(criteria.orderBy)};
    `

    return query;
  }

  countAll(criteria?: ICriteria<WhereOperators, FilterValues>): string {
    const query = `
      SELECT COUNT(*)
      FROM ${this.tableName}
      WHERE TRUE ${this.parseWhere(criteria.filter)}
    `

    return query;
  }

  getById(criteria?: ICriteria<WhereOperators, FilterValues>): string {
    const query = `
      SELECT ${this.parseSelect(criteria.select)}
      FROM ${this.tableName}
      WHERE ${this.tableId} = $1;
    `

    return query;
  }

  create(columns: string[]): string {
    const query = `
      INSERT INTO ${this.tableName} (${columns.join(', ')})
      VALUES (${this.generateParameterizedVariable(columns.length)});
    `

    return query;
  }

  update(columns: string[], criteria?: ICriteria<WhereOperators, FilterValues>): string {
    const query = `
      UPDATE ${this.tableName}
      SET ${this.parseModelUpdateData(columns)}
      WHERE ${this.parseWhere(criteria.filter)};
    `

    return query;
  }

  deleteById(): string {
    const query = `
      DELETE FROM ${this.tableName}
      WHERE ${this.tableId} = $1;
    `;

    return query;
  }

  private generateParameterizedVariable(varToGenerate: number): string {
    const result = [];
    for (let i = 1; i <= varToGenerate; i++) { result.push(`$${i}`); }

    return result.join(', ');
  }

  private parseModelUpdateData(columns: string[]): string {
    return columns
      .map((col, index) => `${col} = $${index}`)
      .join(', ');
  }

  private parseSelect(columns: string[]): string {
    return columns.map(col => `${this.tableName}.${col}`).join(', ');
  }

  private parseWhere(filters: IFilter<WhereOperators, FilterValues>[]): string {
    const filterLength = filters.length;
    if (!filterLength) return '';

    return filters
      .map((criteria, index) => {
        const AndCondition = criteria.isOptional ? 'OR' : 'AND';
        return `${AndCondition} ${criteria.field} ${criteria.operator} $${index}`
      })
      .join('\n');
  }

  private parseOrderBy(orderBy: IOrderBy[]): string {
    return orderBy
      .map(criteria => `${criteria.field} ${criteria.rule}`)
      .join(' ');
  }
}