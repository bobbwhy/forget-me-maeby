
import uuid from "uuid/v4";

import { IForgetMeMaebyProps } from "./props-interface";

import {

  FORGET_ME_MAEBY,
  PROPS,

  DEFAULT_PROPS, NONE,
} from "./constants";
import ForgetMeMaeby from "./forget-me-maeby";

class Base {

  FAMILY: symbol = FORGET_ME_MAEBY;

  constructor(key: string, props: IForgetMeMaebyProps = DEFAULT_PROPS) {
    this[PROPS] = {
      ...props,
      key,
      uid: uuid(),
    }
  }

  expiresIn(value:number | symbol = NONE): Base | number {
    if (value === NONE) return this[PROPS]['expiresIn'];

    this[PROPS].expiresIn = Number(value);
    return this;
  }

  key(key:string | symbol = NONE): Base | string {
    if (key === NONE) return this[PROPS]['key'];

    this[PROPS].key = String(key);
    return this;
  }

  uid():string {
    return this[PROPS].uid;
  }

}

export default Base;