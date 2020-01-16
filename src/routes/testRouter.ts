import { Router } from "express";
import { inject, named } from "inversify";

import { BaseRouter } from "./baseRouter";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { ITestController } from "@src/IOC/loader";
import { ProvideWithNamed } from "@src/IOC/decorators";

@ProvideWithNamed(TYPES.Router, NAMES.Test)
export class TestRouter extends BaseRouter {
  constructor(
    @inject(TYPES.Router)
    @named(NAMES.NEW)
    protected testRouter: Router,

    @inject(TYPES.Controller)
    @named(NAMES.Test)
    private testController: ITestController
  ) {
    super(testRouter);
  }

  initRoutes(): void {
    this.testRouter.get('/cookie', this.testController.testCookie.bind(this.testController));
  }
}