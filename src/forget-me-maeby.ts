
import {
        ALL,
        NONE,
        DATA,
        PROPS,
        FORGET_ME_MAEBY,

        } from "./constants";

import {
        IDataObject,
        IForgetMeMaebyProps,
      } from "./props-interface";

import DataItem from "./data-item";

import Base from "./base";

/**
 * ForgetMeMaeby is a simple data cache with
 * expiration dates for data.
 */
class ForgetMeMaeby extends Base {

  TYPE = FORGET_ME_MAEBY;
  [DATA]:IDataObject;

  constructor(key: string = "anonymousForgetMeMaeby") {
    super(key);
    this[DATA] = {};
  }

  /**
   * Gets the value of a DataItem by key.  If a defaultValue
   * is passed in, will return the defaultValue if
   * no DataItem is found.
   *
   * If no key is passed in will return ALL DataItem values available.
   *
   * If the value expiresIn is elapsed, will return null;
   * @param { string | symbol } key
   * @param { any } _defaultValue
   */
  get(key:string | symbol = ALL, _defaultValue = NONE): any {
    if (key === ALL) return this.createAllDataPayload();

    const item:DataItem = this[DATA][String(key)];
    if (!item) return _defaultValue;

    return item.get(_defaultValue);
  }

  /**
   * Will set the value of a data item at key to value.
   * Optional override is available for expiresIn value.
   * @param { string } key
   * @param { any } value
   * @param { number | null } expiresIn
   */
  set(key:string, value: any, expiresIn: number | null): ForgetMeMaeby {
    const item: DataItem = this[DATA][key];
    if (!item) return this.createDataItem(key, value, expiresIn);

    item.set(value, expiresIn);
    return this;
  }

  /**
   * deletes a dataItem at key
   * @param { string } key
   */
  delete(key:string): ForgetMeMaeby {
    delete this[DATA][key];
    return this;
  }

  /**
   * Gets the DataItem instance at key.
   * This is different than get as this gets the
   * class instance holding the data.
   * "get" gets the data from that class instance
   * @param ){ string } key
   */
  getDataItem = (key:string):DataItem => this[DATA][key];

  /**
   * @private
   * creates a DataItem instance to hold a value.s
   * @param { string } key
   * @param { any } value
   * @param { number | null } expiresIn
   */
  private createDataItem(key: string, value: any, expiresIn: number | null): ForgetMeMaeby {
    const dataItem: DataItem = new DataItem(key);
    dataItem.expiresIn(expiresIn === null ? Number(this.expiresIn()) : expiresIn);
    dataItem.set(value, null);
    this[DATA][key] = dataItem;
    return this;
  }

  /**
   * @private
   * creates a data object holding the values of ALL data items.
   */
  private createAllDataPayload():object {

    const rt = {};
    const data = this[DATA];
    const dataItemKeys = Object.keys(data);
    dataItemKeys.forEach((key:string):void => {
      rt[key] = data[key].get();
    })
    return rt;
  }

}

export default ForgetMeMaeby;

