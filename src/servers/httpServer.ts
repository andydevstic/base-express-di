import { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { inject, named } from 'inversify';

import { ProvideSingletonWithNamed } from '@src/IOC/decorators';
import { TYPES } from '@src/IOC/types';
import { IServer, IRouter, IDbAdapter } from '@src/IOC/interfaces';
import { NAMES } from '@src/IOC/names';
import { CustomError } from '@src/shared';

@ProvideSingletonWithNamed(TYPES.Server, NAMES.Http)
export class HttpServer implements IServer {
  constructor(
    @inject(TYPES.Application)
    @named(NAMES.Http)
    private app: Application,

    @inject(TYPES.Router)
    @named(NAMES.API)
    private apiRouter: IRouter,

    @inject(TYPES.Router)
    @named(NAMES.Authentication)
    private authRouter: IRouter,

    @inject(TYPES.Router)
    @named(NAMES.Test)
    private testRouter: IRouter,

    @inject(TYPES.Adapter)
    @named(NAMES.Database)
    private databaseAdapter: IDbAdapter
  ) {
    this.onInit();
  }

  async onInit(): Promise<void> {
    await this.initDatabase();

    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandlers();
  }

  async initDatabase(): Promise<void> {
    await this.databaseAdapter.connect();
  }

  initMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json({limit: '10mb'}));
  }

  initRoutes() {
    this.app.use('/auth', this.authRouter.serveRouter());
    this.app.use('/api', this.apiRouter.serveRouter());
    this.app.use('/test', this.testRouter.serveRouter());
  }

  initErrorHandlers() {
    this.app.use((err: CustomError<any>, req: Request, res: Response, next: NextFunction) => {
      res.status(err.code).json({
        isSuccess: false,
        message: err.message,
        detail: err.detail
      })
    })
  }

  serve(port: number) {
    this.app.listen(port, () => {
      console.log('Http server listening on port:', port);
    })
  }
}
