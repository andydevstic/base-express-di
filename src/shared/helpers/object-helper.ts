import { IObjectHelper, IObject } from "@src/IOC/interfaces";
import { ProvideSingletonWithNamed } from "@src/IOC/decorators";
import { TYPES } from "@src/IOC/types";
import { NAMES } from "@src/IOC/names";

@ProvideSingletonWithNamed(TYPES.Helper, NAMES.Object)
export class ObjectHelper implements IObjectHelper {
  constructor() {}

  getKeysFromObject(data: IObject): string[] {
    const keys = [];
    for (let key in data) { keys.push(key); }

    return keys;
  }
}