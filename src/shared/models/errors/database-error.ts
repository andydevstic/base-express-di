import { CustomError, ICustomErrorDetail } from "./custom-error";

export interface IDatabaseErrorDetail extends ICustomErrorDetail {
  fieldName?: string
}

export class DatabaseError extends CustomError<IDatabaseErrorDetail> {}