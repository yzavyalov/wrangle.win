import { http } from "@/api/http";
import { PAYMENTS } from "@/api/enpoints";
import { notifyError } from "@/helpers/notify";

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
