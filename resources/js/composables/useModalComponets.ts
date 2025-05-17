import PredictionComp from "@/components/bet/PredictionComp.vue";
import EventCardFull from "@/components/EventCardFull.vue";
import LoginOrRegister from "@/components/modals/views/LoginOrRegister.vue";
import ProposePopUpBalance from "@/components/modals/views/ProposePopUpBalance.vue"

export const getModalComponent = modalName => {
  const dynamicModalName = modalName?.value ? modalName.value : modalName;

  switch (dynamicModalName) {
    case "prediction-modal":
      return PredictionComp;

    case "bet-modal":
      return EventCardFull;

    case "login-or-register-modal":
      return LoginOrRegister;

    case "propose-balance-modal":
      return ProposePopUpBalance

    default:
      console.warn(`No handle for such modal name - ${modalName}`);
      return null;
  }
}
