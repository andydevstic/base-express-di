import { Router, RequestHandler, Request } from "express";
import { SignOptions } from "jsonwebtoken";

export interface IServer {
  serve(port: number, hostname?: string): void;
}

export interface IRouter {
  serveRouter(): Router
  initRoutes(): void
}

export interface IAuthGuard {
  getAuthenticationHandler(): RequestHandler;
  authenticateToken(token: string): Promise<AuthenticateTokenResult>;
}

export interface ICustomError {
  throw(code: number, message: string, errCat: ErrorCategory): void;
}

export enum ErrorCategory {
  Internal = 'Internal Server Error',
  Database = 'Database error',
}

export interface IEnvironmentConfig {
  HostName?: string;
  PORT: number;
  websocketHost: string;
  websocketPort: number;
  websocketMaxMessageSize: number;
  rabbitMQHost: string;
  rabbitMQPort: number;
  rabbitQueueName: string;
  authServerHost: string;
  authServerPort: number;
  authSecretKey: string;

}

export interface IHttpModel {
  get(url: string, config?: any): Promise<any>;
  post(url: string, config?: any): Promise<any>;
  put(url: string, config?: any): Promise<any>;
  delete(url: string, config?: any): Promise<any>;
}

export interface IHttpService extends IHttpModel {}

export interface AuthTokenVerificationResponse {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isSuperAdmin: boolean;
    status: number;
  };
  account: {
    id: number;
    name: string;
    email: string;
    type: number;
    adminId: string;
    brandId: string;
    companyId: string;
    permissions: string[];
  };
  originalAccount: {
    id: number;
    name: string;
    email: string;
    type: number;
    adminId: string;
    brandId: string;
    companyId: string;
    permissions: string[];
    transaction: any;
    token: string;
  }
}

export interface IRequest extends Request {
  context: any
}

export enum ServerTypes {
  Http = 'Http',
  Websocket = 'Websocket'
}

export interface AuthenticateTokenResult {
  isAuthenticated: boolean;
  context: AuthTokenVerificationResponse
}

export interface ITokenHelper<Payload> {
  generateToken(payload: Payload, config: SignOptions): string;
  parseToken(token: string): Payload;
}

export interface ITokenService {
  parseToken(authToken: string): Promise<AuthTokenVerificationResponse>;
}