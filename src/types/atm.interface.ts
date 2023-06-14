export enum Status {
  WELCOME,
  CONNECTING,
  ON_ENTER,
  IN_PROGRESS,
};

export interface Account {
  pin: string;
  firstName: string;
  lastName: string;
  balance: number;
  accountType: number;
}