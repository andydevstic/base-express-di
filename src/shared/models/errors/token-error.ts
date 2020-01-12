import { CustomError } from "@src/shared/models/errors/custom-error";

export interface ITokenErrorDetail {
  message?: string;
}

export class TokenError extends CustomError<ITokenErrorDetail> {}