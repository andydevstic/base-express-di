import { inject, named } from "inversify";
import { Router } from "express";

import { BaseRouter } from "@src/routes/baseRouter";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { ProvideSingletonWithNamed } from "@src/IOC/decorators";

@ProvideSingletonWithNamed(TYPES.Router, NAMES.API)
export class ApiRouter extends BaseRouter {
  constructor(
    @inject(TYPES.Router)
    @named(NAMES.NEW)
    protected apiRouter: Router,

  ) { super(apiRouter); }

  initRoutes() {
  }
}