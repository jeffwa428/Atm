import { API_Response } from "../types/atm.interface";
import { accounts } from "./mockData";

export const getAccountInfoFromPIN = async (pinNum: number): Promise<API_Response> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const account = accounts.find(account => account.pin === pinNum);
      if (account) {
        resolve({
          status: 'success',
          data: account,
        });
      } else {
        resolve({
          status: 'failed',
          message: 'Could not find account!',
        });
      }
    }, 1000);
  });
};

export const withdrawMoney = async (pinNum: number, amount: number): Promise<API_Response> => {
  console.log(pinNum, amount);
  return new Promise((resolve) => {
    setTimeout(() => {
      const account = accounts.find(account => account.pin === pinNum);
      if (account!.balance > amount) {
        account!.balance -= amount;
        resolve({
          status: 'success',
          data: account,
        });
      } else {
        resolve({
          status: 'failed',
          message: 'Balance is not enough!',
        });
      }
    }, 1000);
  });
};

export const depositMoney = async (pinNum: number, amount: number): Promise<API_Response> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const account = accounts.find(account => account.pin === pinNum);
      account!.balance += amount;
      resolve({
        status: 'success',
        data: account,
      });
    }, 1000);
  });
};