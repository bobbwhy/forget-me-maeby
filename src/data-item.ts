
import {
        NONE,

        DATA,
        PROPS,

        DATA_ITEM,
      } from './constants';
"
import { IDataItemProps } from "./props-interface";

class DataItem {

  TYPE: symbol = DATA_ITEM;
  [DATA]: object;
  [PROPS]: IDataItemProps;

  constructor(props:IDataItemProps, value: any) {
    this[DATA] = value;
    this[PROPS] = props;
  }

  get(_defaultValue:any = NONE) {

    const { expires, lastSetTime } = this[PROPS];

    const elapsed = new Date() - lastSetTime;
    if (elapsed > expires) return _defaultValue;

    return this[DATA];
  }

  set(value:any, expiresIn: number | null): void {
    this[DATA] = value;
    this[PROPS].lastSetTime = new Date();
    if (expiresIn === null) return;

    this[PROPS].expiresIn = Number(expiresIn);
  }

}

export default DataItem;