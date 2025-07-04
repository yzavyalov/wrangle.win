import { http } from "@/api/http";
import { PAYMENTS } from "@/api/enpoints";
import { notifyError } from "@/helpers/notify";
import { GetOutPaymentCodePayload, CreateWidrawalPayload, ImportMetaEnv, ImportMeta } from "@/types/payments";

export const fetchOutPayments = async () => {
  return await http.get(PAYMENTS.URL_OUT)
  .then(res => {
    console.log(res, "res - fetchOutPayments");

    return res?.data?.data;
  })
  .catch(e => console.error(e.message));
};

export const fetchInPayments = async () => {
  return await http.get(PAYMENTS.URL_IN)
  .then(res => {
    console.log(res, "res - fetchInPayments");

    return res?.data?.data;
  })
  .catch(e => console.error(e.message));
};

export const getOutPaymentCode = async (payload: GetOutPaymentCodePayload) => {

  const currencyName: ImportMetaEnv["VITE_CURRENT_CURRENCY"] = (import.meta as unknown as ImportMeta).env.VITE_CURRENT_CURRENCY || "EUR";
  payload.currency = currencyName;

  const stringRequestBody = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);

  const requestUrl = `${PAYMENTS.URL_PAYOUT}/${payload.methodId}` + "?" + new URLSearchParams(stringRequestBody).toString();

  return await http.get(requestUrl)
  .then(res => {
    console.log(res, "res - getOutPaymentCode");

    return res?.data?.data;
  })
  .catch(e => notifyError(e.message));
};

export const createWidrawal = async (payload: CreateWidrawalPayload) => {

  const currencyName: ImportMetaEnv["VITE_CURRENT_CURRENCY"] = (import.meta as unknown as ImportMeta).env.VITE_CURRENT_CURRENCY || "EUR";
  payload.currency = currencyName;

  const requestUrl = `${PAYMENTS.URL_PAYOUT}/${payload.methodId}`;

  return await http.post(requestUrl, payload)
  .then(res => {
    console.log(res, "res - createWithdrawal");

    return res?.data?.data;
  })
  .catch(e => notifyError(e.message));
};
