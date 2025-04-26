import PredictionComp from "@/components/bet/PredictionComp.vue";

export const getModalComponent = modalName => {
  const dynamicModalName = modalName?.value ? modalName.value : modalName;

  switch (dynamicModalName) {
    case "prediction-modal":
      return PredictionComp;

    default:
      console.warn(`No handle for such modal name - ${modalName}`);
      return null;
  }
}
