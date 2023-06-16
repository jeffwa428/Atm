export enum Status {
  WELCOME,
  AUTHENTICATION,
  ON_ENTER,
  GET_BALANCE,
  GET_WITHDRAW,
  GET_DEPOSIT,
  NOT_FOUND,
  ERROR,
  EXIT,
  LOADING,
};

export interface Account {
  pin: number;
  firstName: string;
  lastName: string;
  balance: number;
  accountType: number;
  currency?: string;
}

export interface API_Response {
  status: string;
  data?: Account;
  message?: string;
}