import 'reflect-metadata';

import container from "./IOC/containerConfig"
import { IServer, ServerTypes, IEnvironmentConfig } from "./IOC/interfaces"
import { TYPES } from "./IOC/types"
import { NAMES } from './IOC/names';

const config = container.getNamed<IEnvironmentConfig>(TYPES.Constant, NAMES.Env);

const port = config.PORT || 3000;
const hostname = config.HostName || '0.0.0.0';
const serverType = <ServerTypes>process.env.SERVER_TYPE || ServerTypes.Http;

const server = container.getNamed<IServer>(TYPES.Server, serverType);
server.serve(port, hostname);