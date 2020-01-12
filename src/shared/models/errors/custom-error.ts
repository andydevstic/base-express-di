import { injectable } from "inversify";

import { ErrorTypes } from "@src/core/shared/interfaces";

export interface ICustomError<IErrorDetail> {
  code: number;
  errorType: ErrorTypes;
  detail?: IErrorDetail;
}

@injectable()
export class CustomError<IErrorDetail> extends Error implements ICustomError<IErrorDetail> {
  static throwCustomError(error: Error): void {
    if (error instanceof CustomError) { throw error; }
    throw new CustomError(500, ErrorTypes.Internal);
  }

  public code: number;
  public errorType: ErrorTypes;
  public detail: IErrorDetail;

  constructor(code: number, errorType: ErrorTypes, detail?: IErrorDetail) {
    super(errorType);
    this.code = code;
    this.detail = detail;
    this.errorType = errorType;
  }
}