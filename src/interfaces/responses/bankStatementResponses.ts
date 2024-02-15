import { IBaseResponse } from "../baseResponses";

export interface IBankStatement {
  id: string;
  name: string;
  dateTransaction: Date;
  amount: number;
  created_At: Date;
  updated_At: Date;
}

export interface ICreateBankStatement extends IBaseResponse {
  data: Array<IBankStatement>;
}

export interface GetBankStatements extends IBaseResponse {
  data: Array<IBankStatement>;
}
