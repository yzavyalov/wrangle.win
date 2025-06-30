import { ref, defineComponent, createVNode, render, h } from "vue";
import ModalCodeConfirm from "@/components/modals/ModalCodeConfirm.vue";

const createSlotVNode = (slot) => {
  return h(
    slot.tag,
    { ...slot.attrs, class: slot.class },
    slot.content,
    slot.children?.length && slot.children.map((child) => {
      if (!child.children) {
        return h(
          child.tag,
          { ...child.attrs, class: child.class },
          child.content
        );
      }
      return createSlotVNode(child);
    })
  );
};

export const useCodeConfirm = () => {
  const confirmPromise = ref(null);

  const confirm = (options, slots = null) => {
    const { text, title, confirmText, cancelText, sybmols, absolute, disablePadding, top = 0, selector } = options;
    confirmPromise.value = new Promise((resolve) => {
      const container = document.createElement("div");
      container.classList.add("confirm-modal-wrapper");
      if (selector && document.querySelector(selector) !== null) {
        document.querySelector(selector).appendChild(container);
      } else {
        document.body.appendChild(container);
      }


      const confirmComponent = defineComponent(ModalCodeConfirm);
      const slotElements = {};
      if (slots) {
        Object.keys(slots).forEach((key) => {
          const slot = slots[key];
          slotElements[key] = () => createSlotVNode(slot);
        });
      }
      const vnode = createVNode(confirmComponent, { title, text, confirmText, sybmols, cancelText, absolute: absolute || false, disablePadding: disablePadding || false, top }, slotElements);

      vnode.props.onConfirm = (payload) => {
        resolve(payload || true);
        unmount();
      };
      vnode.props.onCancel = () => {
        resolve(false);
        unmount();
      };

      const unmount = () => {
        render(null, container);
        if (selector && document.querySelector(selector) !== null) {
          document.querySelector(selector).removeChild(container);
        } else {
          document.body.removeChild(container);
        }
      };

      render(vnode, container);
    });

    return confirmPromise.value;
  };

  return { confirm };
};
