import { Router, RequestHandler, Request } from "express";
import { SignOptions } from "jsonwebtoken";
import { AuthPayload } from "@src/core/shared/interfaces";

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

export interface NodeProcessEnv {
  development: IEnvironmentConfig;
  production: IEnvironmentConfig;
}

export enum Environments {
  dev = 'development',
  prod = 'production'
}

export interface IEnvironmentConfig {
  HostName?: string;
  Env: Environments,
  PORT: number | string;
  authSecretKey: string;
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