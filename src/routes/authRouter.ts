import { inject, named } from "inversify";
import { Router } from "express";

import { BaseRouter } from "@src/routes/baseRouter";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { IAuthController } from "@src/IOC/loader";

@ProvideSingletonWithNamed(TYPES.Router, NAMES.Authentication)
export class AuthRouter extends BaseRouter {
  constructor(
    @inject(TYPES.Router)
    @named(NAMES.NEW)
    protected authRouter: Router,

    @inject(TYPES.Controller)
    @named(NAMES.Authentication)
    private authController: IAuthController
  ) { super(authRouter); }

  initRoutes(): void {
    this.authRouter.post('/login', this.authController.login.bind(this.authController));
  }
}