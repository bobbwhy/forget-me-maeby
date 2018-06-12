
import {
        ALL,
        NONE,
        DATA,
        PROPS,
        FORGET_ME_MAEBY,
        } from "./constants";

class ForgetMeMaeby {

  TYPE = FORGET_ME_MAEBY;
  [DATA]:object;
  [PROPS]:object;

  constructor() {
    this[DATA] = {};
    this[PROPS] = {
      expires: 1000 * 60 * 60 * 24,
      lastSetTime: new Date(),
    }
  }

  get(key:string | symbol = ALL, _defaultValue = NONE) {
    if (key === ALL) return this[DATA];

    const item = this[DATA][key];

    if (!item) return _defaultValue;

    return item.get(_defaultValue);
  }

  expires(value:number | symbol = NONE) {
    if (value === NONE) return this[PROPS]['expires'];

    this[PROPS]['expires'] = value;
  }

}

export default ForgetMeMaeby;
