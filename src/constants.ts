
import { IForgetMeMaebyProps } from "./props-interface";

// VALUES
export const ALL = Symbol('ALL');
export const NONE = Symbol('NONE');

// KEYS
export const DATA = Symbol('DATA');
export const KEYS = Symbol('KEYS');
export const PROPS = Symbol('PROPS');

// TYPES
export const FORGET_ME_MAEBY = Symbol('FORGET_ME_MAEBY');
export const DATA_ITEM = Symbol('DATA_ITEM');

// VALU ES
export const DEFAULT_PROPS: IForgetMeMaebyProps = {
          key: "",
          expiresIn: 1000 * 60 * 60,
          lastSetTime: new Date(),
          uid: "",
       }


export interface ICONSTANTS {

          ALL: symbol
          NONE: symbol,
          DATA: symbol,
          KEYS: symbol,
          PROPS: symbol,

          FORGET_ME_MAEBY: symbol,
          DATA_ITEM: symbol,

          DEFAULT_PROPS: IForgetMeMaebyProps,
        }




