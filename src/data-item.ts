
import {
        NONE,

        DATA,
        PROPS,

        DATA_ITEM,
      } from './constants'

class DataItem {

  TYPE: symbol = DATA_ITEM;
  [DATA]: object;
  [PROPS]: object;

  constructor(key:string, props:object, data:any = NONE) {

    this[DATA] = data;
    this[PROPS] = {
      ...props,
      lastSetTime: new Date(),
      key
    }

  }

  get(_defaultValue:any = NONE) {

    const { expires, lastSetTime } = this[PROPS];

    const elapsed = new Date() - lastSetTime;
    if (elapsed > expires) return _defaultValue;

    return this[DATA];
  }

  set(value:any) {
    const { key } = this[PROPS];

    this[DATA][key] = value;
    this[PROPS].lastSetTime = new Date();
    return this;
  }

}

export default DataItem;