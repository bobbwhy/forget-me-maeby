
import {
        NONE,

        DATA,
        PROPS,

        DATA_ITEM,
      } from './constants';

import Base from "./base";

/**
 * The data Item accessor for a ForgetMeMaeby cache
 */
class DataItem extends Base {

  TYPE: symbol = DATA_ITEM;
  [DATA]: object;

  constructor(key: string) {
    super(key);
  }

  /**
   * gets the value of this dataitem.  If a default value is passed
   * in returns that if the set value == null or if time elapsed
   * @param { any } _defaultValue
   */
  get(_defaultValue:any = NONE) {

    const { expiresIn, lastSetTime } = this[PROPS];

    const elapsed = ( new Date().valueOf() ) - lastSetTime.valueOf();

    if (expiresIn === -1 || expiresIn > elapsed) return this[DATA];

    return _defaultValue;

    // return this[DATA];
  }

  /**
   * lets the value of this data item.
   * allows for
   * @param value
   * @param expiresIn
   */
  set(value:any, expiresIn: number | null): void {
    this[DATA] = value;
    this[PROPS].lastSetTime = new Date();
    if (expiresIn === null) return;

    this[PROPS].expiresIn = Number(expiresIn);
  }

}

export default DataItem;