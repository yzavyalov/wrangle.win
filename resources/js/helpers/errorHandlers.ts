import { notifyWarning } from "./notify";

export const handleErrorNotify = (e: any) => {
  console.warn(e, "e - handleError");

  let message = 'Unknown error';

  if (e?.response?.data) {
    const data = e.response.data;
    const keys = Object.keys(data);

    if (keys.length > 0) {
      const firstKey = keys[0];
      const value = data[firstKey];
      message = Array.isArray(value) ? value[0] : value;
    }
  } else if (e?.message) {
    message = e.message;
  }

  notifyWarning(message);
  console.error(message);

  return message;
}
