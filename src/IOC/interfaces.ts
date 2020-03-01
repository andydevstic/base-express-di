import { Router, RequestHandler, Request } from "express";
import { SignOptions } from "jsonwebtoken";

import { AuthPayload, PaginateResponse, ICriteria } from "@src/core/shared/interfaces";

export interface IServer {
  serve(port: number | string, hostname?: string): void;
}

export interface IRouter {
  serveRouter(): Router
}

export interface IAuthGuard {
  getAuthenticationHandler(): RequestHandler;
}

export interface ICustomError {
  throw(code: number, message: string, errCat: ErrorCategory): void;
}

export enum ErrorCategory {
  Internal = 'Internal Server Error',
  Database = 'Database error',
}

export enum Environments {
  dev = 'development',
  prod = 'production'
}

export interface IEnvironmentConfig {
  HostName?: string;
  Env: Environments,
  PORT: number | string;
  JwtSecretKey: string;
  PasswordSecretKey: string;
  PasswordHashRounds?: string | number;
  Db_Host: string;
  Db_Port: number;
  Db_User: string;
  Db_Password: string;
}

export interface IHttpModel {
  get(url: string, config?: any): Promise<any>;
  post(url: string, config?: any): Promise<any>;
  put(url: string, config?: any): Promise<any>;
  delete(url: string, config?: any): Promise<any>;
}

export interface IHttpService extends IHttpModel {}

export interface IRequest extends Request {
  context?: any
}

export enum ServerTypes {
  Http = 'Http',
  Websocket = 'Websocket'
}

export interface ITokenModel<Payload> {
  generateToken(payload: Payload, config?: SignOptions): string;
  parseToken(token: string): Payload;
}

export interface ITokenService {
  parseToken(authToken: string): AuthPayload;
}

export interface IAuthCredential {
  username: string;
  password: string;
}

export interface IDatabaseEnv {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
}

export enum DIALECTS {
  postgres = 'postgres',
  mysql = 'mysql'
}

export interface StringHashCompareResult {
  isSuccess: boolean;
  message?: string;
}

export interface IStringHashModel {
  hash(data: string): Promise<string>;
  compare(inputString: string, destinationString: string): Promise<StringHashCompareResult>;
}

export type PromiseResolve = (data: any) => void;
export type PromiseReject = (data: any) => void;

export type FilterValues = number | string | number[] | string[] | boolean;
export type WhereOperators =
    '='
  | '!='
  | 'IS'
  | 'IS NOT'
  | 'IN'
  | 'NOT IN'
  | '>'
  | '<'
  | '>='
  | '<=';

export interface IRDBModel<Model> {
  paginate(limit: number, page: number, criteria?: ICriteria<WhereOperators, FilterValues>): Promise<PaginateResponse<Model>>;
  getAll(criteria?: ICriteria<WhereOperators, FilterValues>): Promise<Model[]>;
  getById(id: number | string, criteria?: ICriteria<WhereOperators, FilterValues>): Promise<Model>;

  create(modelData: Model): Promise<Model>;
  bulkCreate(modelData: Model[]): Promise<Model>;

  update(modelData: Model): Promise<Model>;
  bulkUpdate(modelData: Model[]): Promise<Model>;

  deleteById(id: number | string, criteria?: ICriteria<WhereOperators, FilterValues>): Promise<void>;
  bulkDelete(criteria?: ICriteria<WhereOperators, FilterValues>): Promise<void>;
}

export interface IQueryHelper {
  paginate(limit: number, page: number, criteria?: ICriteria<WhereOperators, FilterValues>): string;
  getAll(criteria?: ICriteria<WhereOperators, FilterValues>): string;
  countAll(criteria?: ICriteria<WhereOperators, FilterValues>): string;
  getById(criteria?: ICriteria<WhereOperators, FilterValues>): string;

  create(columns: string[]): string;

  update(columns: string[]): string;

  deleteById(): string;
}

export interface IDbAdapter {
  connect(): Promise<void>;
  query(sql: string, data?: any): Promise<any>;
}

export type IObject = {
  [key: string]: any
}

export interface IObjectHelper {
  getKeysFromObject(data: IObject): string[];
}