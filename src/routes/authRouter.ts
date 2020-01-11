import { BaseRouter } from "./baseRouter";
import { inject, named } from "inversify";
import { TYPES } from "src/IOC/types";
import { NAMES } from "src/IOC/names";
import { Router } from "express";
import { ProvideSingletonWithNamed } from "src/IOC/decorators";

@ProvideSingletonWithNamed(TYPES.Router, NAMES.Authentication)
export class AuthRouter extends BaseRouter {
  constructor(
    @inject(TYPES.Router)
    @named(NAMES.NEW)
    protected authRouter: Router
  ) {
    super(authRouter);
  }

  initRoutes(): void {
    this.authRouter.post('/login')
  }


}