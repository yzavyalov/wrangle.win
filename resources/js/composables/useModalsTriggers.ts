export const OPEN_MODAL_EVENT_NAME = "open-modal";
export const CLOSE_MODAL_EVENT_NAME = "close-modal";


export const triggerOpenNewModal = async (modalName: string, options = {}) => {
  console.log("triggerOpenNewModal");

  const event = new CustomEvent(OPEN_MODAL_EVENT_NAME, {
    detail: { modalName, options }
  });
  window.dispatchEvent(event);
};


export const triggerCloseModal = async (modalName: string, options: any = {}) => {
  console.log("triggerCloseModal");

  const event = new CustomEvent(CLOSE_MODAL_EVENT_NAME, {
    detail: { modalName, options }
  });
  window.dispatchEvent(event);
};
