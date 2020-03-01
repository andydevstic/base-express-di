import { CustomError, ICustomErrorDetail } from "./custom-error";
import { ProvideWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";

export interface IHashErrorDetail extends ICustomErrorDetail {}

@ProvideWithNamed(TYPES.CustomError, NAMES.StringHash)
export class StringHashError extends CustomError<IHashErrorDetail> {}