import { accounts } from "./mockData";

export const getAccountInfoFromPIN = async (pinNum: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(accounts.find(account => account.pin === pinNum));
    }, 200);
  });
};