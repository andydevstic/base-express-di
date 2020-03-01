import { ProvideWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";
import { PostgresBaseRepo } from "../base";

@ProvideWithNamed(TYPES.Repo, NAMES.User)
export class PostgresUserRepo extends PostgresBaseRepo<any> {
  constructor() {}
  
  
}