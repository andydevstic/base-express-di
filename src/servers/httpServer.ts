import { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { inject, named } from 'inversify';
import { ProvideSingletonWithNamed } from '../IOC/decorators';
import { TYPES } from '../IOC/types';
import { IServer, IRouter } from '../IOC/interfaces';
import { NAMES } from '../IOC/names';


@ProvideSingletonWithNamed(TYPES.Server, NAMES.Http)
export class HttpServer implements IServer {
  constructor(
    @inject(TYPES.Application)
    @named(NAMES.Http)
    private app: Application,

    @inject(TYPES.Router)
    @named(NAMES.API)
    private apiRouter: IRouter,
  ) {
    this.onInit();
  }

  async onInit(): Promise<void> {
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandlers();
  }

  initMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json({limit: '10mb'}));
  }

  initRoutes() {
    this.app.use('/api', this.apiRouter.serveRouter());
  }

  initErrorHandlers() {
    this.app.use((err, req, res, next) => {
      console.log(err);
    })
  }

  serve(port: number) {
    this.app.listen(port, () => {
      console.log('Http server listening on port:', port);
    })
  }
}
