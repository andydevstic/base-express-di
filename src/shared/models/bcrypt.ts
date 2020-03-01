import * as bcrypt from 'bcrypt';
import { inject, named } from 'inversify';

import { IStringHashModel, IEnvironmentConfig, PromiseResolve, PromiseReject, StringHashCompareResult } from '@src/IOC/interfaces';
import { ProvideWithNamed } from '@src/IOC/decorators';
import { TYPES } from '@src/IOC/types';
import { NAMES } from '@src/IOC/names';
import { StringHashError, AuthenticationError } from './errors';
import { ErrorTypes } from '@src/core/shared/interfaces';
import { MESSAGES } from '@src/core/shared/messages';

@ProvideWithNamed(TYPES.Model, NAMES.StringHash)
export class BcryptModel implements IStringHashModel {
  private hashSecret: string;
  private resolveCall: PromiseResolve;
  private rejectCall: PromiseReject;

  constructor(
    @inject(TYPES.Constant)
    @named(NAMES.Env)
    env: IEnvironmentConfig
  ) {
    this.hashSecret = env.PasswordSecretKey;
  }

  hash(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.resolveCall = resolve;
      this.rejectCall = reject;
      bcrypt.hash(data, this.hashSecret, this.onHashComplete.bind(this));
    })
  }

  private onHashComplete(error: Error, hashedString: string): void {
    if (error) {
      const hashError = new StringHashError(error, 500, ErrorTypes.Internal, { message: MESSAGES.StringHash.error.SH_ER_001 })
      return this.rejectCall(hashError);
    }
    this.resolveCall(hashedString);
  }

  compare(inputString: string, destinationString: string): Promise<StringHashCompareResult> {
    return new Promise((resolve, reject) => {
      this.resolveCall = resolve;
      this.rejectCall = reject;
      bcrypt.compare(inputString, destinationString, this.onCompareComplete.bind(this));
    })
  }

  private onCompareComplete(error: Error, isMatch: boolean): void {
    if (error) {
      const hashError = new AuthenticationError(error, 500, ErrorTypes.Internal, { message: MESSAGES.StringHash.error.SH_ER_002 })
      return this.rejectCall(hashError);
    }

    this.resolveCall(<StringHashCompareResult>{
      isSuccess: isMatch,
      message: isMatch ? null : MESSAGES.Auth.error.AU_ER_003
    });
  }
}