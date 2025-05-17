import { ref, defineComponent, createVNode, render, h } from "vue";
import ModalInform from "@/components/modals/ModalInform.vue";

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

export const useInform = () => {
  const informPromise = ref(null);

  const inform = (options, slots = null) => {
    const { text, title, informText, absolute, disablePadding, top = 0, selector } = options;
    informPromise.value = new Promise((resolve) => {
      const container = document.createElement("div");
      container.classList.add("inform-modal-wrapper");
      if (selector && document.querySelector(selector) !== null) {
        document.querySelector(selector).appendChild(container);
      } else {
        document.body.appendChild(container);
      }


      const informComponent = defineComponent(ModalInform);
      const slotElements = {};
      if (slots) {
        Object.keys(slots).forEach((key) => {
          const slot = slots[key];
          slotElements[key] = () => createSlotVNode(slot);
        });
      }
      const vnode = createVNode(informComponent, { title, text, informText, absolute: absolute || false, disablePadding: disablePadding || false, top }, slotElements);

      vnode.props.onInform = () => {
        resolve(true);
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

    return informPromise.value;
  };

  return { inform };
};
