import { http } from "@/api/http";
import { PAYMENTS } from "@/api/enpoints";
import { notifyError } from "@/helpers/notify";

export const fetchOutPayments = async () => {
  return await http.get(PAYMENTS.URL_OUT)
  .then(res => {
    console.log(res, "res - fetchOutPayments");

    const { success, message, data } = res.data

    if (!success) { return notifyError(message); }

    console.log(data, 'data - fetchOutPayments');

    return success;
  })
  .catch(e => console.error(e.message));
};


export const fetchInPayments = async () => {
  return await http.get(PAYMENTS.URL_IN)
  .then(res => {
    console.log(res, "res - fetchInPayments");

    const { success, message, data } = res.data

    if (!success) { return notifyError(message); }

    console.log(data, 'data - fetchInPayments');

    return success;
  })
  .catch(e => console.error(e.message));
};
