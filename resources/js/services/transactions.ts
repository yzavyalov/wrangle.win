import { http } from "@/api/http";
import { TRANSACTIONS } from "@/api/enpoints";
import { FetchTransactionsPayload } from "@/types/transactions";

export const fetchUserTransactions = async (payload: FetchTransactionsPayload) => {
  if (!payload) { return console.warn("Payload is required. fetchUserTransactions");}

  const stringRequestBody = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);

  const requestUrl = TRANSACTIONS.URL_TRANSACTIONS + "?" + new URLSearchParams(stringRequestBody).toString();

  return await http.get(requestUrl)
  .then(res => {
    console.log(res, "res - fetchUserTransactions");

    return res?.data?.data?.transactions;
  })
  .catch(e => console.error(e.message));
};
