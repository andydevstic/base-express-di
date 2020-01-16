import { Request, Response, NextFunction } from "express";
// import uuidV4 from 'uuid/v4';
import { ProvideWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";

export interface ITestController {
  testCookie(req: Request, res: Response, next: NextFunction): void;
}

@ProvideWithNamed(TYPES.Controller, NAMES.Test)
export class TestController implements ITestController {
  constructor() {}

  testCookie(req: Request, res: Response, next: NextFunction): void {
    const testUuid = '   \n';
    const domainName = '.adsrv.io';

    res.cookie('uuid', testUuid, {
      domain: domainName,
      path: '/',
      encode: String
    });

    res.status(200).json({
      success: true,
      message: 'Cookie set!'
    })
  }
}