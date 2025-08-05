import { notifyWarning } from "./notify";

export const handleErrorNotify = (e: any) => {

  console.warn(e, "e - handleError");

  if (e?.response?.data) {
    const keys = Object.keys(e?.response?.data);

    if (keys.length > 1) {
      const errorMessage = Array.isArray(e?.response?.data[keys[0]]) ? e?.response?.data[keys[0]].at(0) : e?.response?.data[keys[0]];
      errorMessage && notifyWarning(errorMessage);
      errorMessage && console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  if (e?.message) {
    notifyWarning(e.message);
    console.error(e.message);
    throw new Error(e.message);
  }

  throw new Error(e);
}
