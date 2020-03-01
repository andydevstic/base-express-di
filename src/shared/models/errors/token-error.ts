import { CustomError, ICustomErrorDetail } from "@src/shared/models/errors/custom-error";

export interface ITokenErrorDetail extends ICustomErrorDetail {}

export class TokenError extends CustomError<ITokenErrorDetail> {}