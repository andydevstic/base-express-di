import { CustomError, ICustomErrorDetail } from "@src/shared/models/errors/custom-error";
import { ProvideWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";

export interface IAuthErrorDetail extends ICustomErrorDetail {}

@ProvideWithNamed(TYPES.CustomError, NAMES.Authentication)
export class AuthenticationError extends CustomError<IAuthErrorDetail> {}