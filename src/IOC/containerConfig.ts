import express from 'express';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';

import { NAMES } from '@src/IOC/names';
import { TYPES } from './types';
import * as environment from '../../config';
import { IEnvironmentConfig, Environments, NodeProcessEnv } from './interfaces';

const container = new Container();
const config = <NodeProcessEnv>environment;
const runtimeEnv = <Environments>process.env.NODE_ENV;

container
  .bind(TYPES.Application)
  .toConstantValue(express())
  .whenTargetNamed(NAMES.Http)

container
  .bind<IEnvironmentConfig>(TYPES.Constant)
  .toConstantValue(config[runtimeEnv])
  .whenTargetNamed(NAMES.Env)

container
  .bind<express.Router>(TYPES.Router)
  .toFactory(() => express.Router())
  .whenTargetNamed(NAMES.NEW);

import './loader';

container.load(buildProviderModule());

export default container;