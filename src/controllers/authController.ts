import { ProvideWithNamed } from "src/IOC/decorators";
import { TYPES } from "src/IOC/types";
import { NAMES } from "src/IOC/names";
import { Request, Response, NextFunction } from "express";
import { inject, named } from "inversify";
import { IAuthService } from "src/services/authService";

export interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): void
}

@ProvideWithNamed(TYPES.Controller, NAMES.Authentication)
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.Service)
    @named(NAMES.Authentication)
    private authService: IAuthService
  ) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

    } catch (error) {

    } finally {

    }
  }
}