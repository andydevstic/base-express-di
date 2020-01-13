import { injectable } from "inversify";

import { ErrorTypes } from "@src/core/shared/interfaces";

export interface ICustomError<IErrorDetail> {
  isCustomError: boolean;
  code: number;
  errorType: ErrorTypes;
  detail?: IErrorDetail;
}

@injectable()
export class CustomError<IErrorDetail> extends Error implements ICustomError<IErrorDetail> {
  static wrapError(error: CustomError<any>): CustomError<any> {
    if (error.isCustomError) { return error; }
    return new CustomError(500, ErrorTypes.Internal);
  }

  public code: number;
  public isCustomError: boolean;
  public errorType: ErrorTypes;
  public detail: IErrorDetail;

  constructor(code: number, errorType: ErrorTypes, errorDetail?: IErrorDetail) {
    super(errorType);
    this.code = code;
    this.detail = errorDetail;
    this.errorType = errorType;
    this.isCustomError = true;
  }
}