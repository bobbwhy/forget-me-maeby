
import {
        ALL,
        NONE,
        DATA,
        KEYS,
        PROPS,
        FORGET_ME_MAEBY,
        } from "./constants";

import {
        IDataItemProps,
        IDataObject,
        IForgetMeMaebyProps,
      } from "./props-interface";

import DataItem from "./data-item";

const CREATE_DATA_ITEM = Symbol('CREATE_DATA_ITEM');

class ForgetMeMaeby {

  TYPE = FORGET_ME_MAEBY;
  [DATA]:IDataObject;
  [PROPS]:IForgetMeMaebyProps;

  constructor() {
    this[DATA] = {};
    this[PROPS] = {
      expiresIn: 1000 * 60 * 60 * 24,
      lastSetTime: new Date(),
    }
  }

  get(key:string | symbol = ALL, _defaultValue = NONE): any {
    if (key === ALL) return this[DATA];

    const item:DataItem = this[DATA][String(key)];
    if (!item) return _defaultValue;

    return item.get(_defaultValue);
  }

  set(key:string, value: any, expiresIn: number | null): ForgetMeMaeby {
    const item: DataItem = this[DATA][key];
    if (!item) return this.createDataItem(key, value, expiresIn);

    item.set(value, expiresIn);
    return this;
  }

  delete(key:string): ForgetMeMaeby {
    delete this[DATA][key];
    return this;
  }

  expiresIn(value:number | symbol = NONE): ForgetMeMaeby | number {
    if (value === NONE) return this[PROPS]['expiresIn'];

    this[PROPS].expiresIn = Number(value);
    return this;
  }

  private createDataItem(key: string, value: any, expiresIn: number | null): ForgetMeMaeby {
    const props:IDataItemProps  = {
            ...this[PROPS],
            key,
            expiresIn: Number(expiresIn),
          }
    this[DATA][key] = new DataItem(props, value);
    return this;
  }

}

export default ForgetMeMaeby;

// export default true;