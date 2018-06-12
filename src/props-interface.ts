

export interface IForgetMeMaebyProps {
            expiresIn: number;
            lastSetTime: Date;
          }

export interface IDataItemProps {
            key: string;
            expiresIn: number;
            lastSetTime: Date;
          }


export interface IDataObject {
            [key: string]: any
          }