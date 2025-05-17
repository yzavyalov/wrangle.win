import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

export const closeNotify = id => notify.close(id);

export const closeNotifyHandle = e => {
  function findAttribute (el, attributeName) {

    if (el.attributes[attributeName]) {
      const id = el.getAttribute(attributeName);
      return closeNotify(parseInt(id));
    }

    if (el.parentNode) {
      findAttribute(el.parentNode, attributeName);
    }

    return;
  }

  findAttribute(e.target, "data-id");
};

export const notifyError = (message, tgroup = "bottom-left") => notify({
  title: "Error",
  text: `${message}`,
  type: "error",
  // data: {
  //   icon: "/images/coin.svg"
  // },
  group: "bottom-left",
  // duration: 30000,
});

export const notifySuccess = (message, group = "bottom-left") => notify({
  title: "Success",
  text: `${message}`,
  type: "success",
  // data: {
  //   icon: "/images/coin.svg"
  // },
  group: group,
  // duration: 30000,
});

export const notifyWarning = (message, group = "bottom-left") => notify({
  title: "Warning",
  text: `${message}`,
  type: "warn",
  // data: {
  //   icon: "/images/coin.svg"
  // },
  group: group,
  ignoreDuplicates: true,
  duration: 5000,
});
