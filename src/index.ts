import 'module-alias/register';
import 'reflect-metadata';

import container from "@src/IOC/containerConfig";
import { IServer, ServerTypes, IEnvironmentConfig } from "@src/IOC/interfaces";
import { TYPES } from "@src/IOC/types"
import { NAMES } from '@src/IOC/names';

const config = container.getNamed<IEnvironmentConfig>(TYPES.Constant, NAMES.Env);

const port = config.PORT || 3030;
const hostname = config.HostName || '0.0.0.0';
const serverType = <ServerTypes>process.env.SERVER_TYPE || ServerTypes.Http;

const server = container.getNamed<IServer>(TYPES.Server, serverType);
server.serve(port, hostname);