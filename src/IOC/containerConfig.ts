import express from 'express';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';

import { NAMES } from '@src/IOC/names';
import { TYPES } from './types';
import { IEnvironmentConfig, Environments } from './interfaces';

const container = new Container();
const runtimeEnv = <Environments>process.env.NODE_ENV;

const config: IEnvironmentConfig = runtimeEnv === Environments.dev
  ? require('@app/config/development')
  : require('@app/config/production');

container
  .bind(TYPES.Application)
  .toConstantValue(express())
  .whenTargetNamed(NAMES.Http)

container
  .bind<IEnvironmentConfig>(TYPES.Constant)
  .toConstantValue(config)
  .whenTargetNamed(NAMES.Env)

container
  .bind<express.Router>(TYPES.Router)
  .toFactory(() => express.Router())
  .whenTargetNamed(NAMES.NEW);

import './loader';

container.load(buildProviderModule());

export default container;