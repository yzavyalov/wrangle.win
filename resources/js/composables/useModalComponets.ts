import PredictionComp from "@/components/bet/PredictionComp.vue";
import EventCardFull from "@/components/EventCardFull.vue";
import LoginOrRegister from "@/components/modals/views/LoginOrRegister.vue";
import ProposePopUpBalance from "@/components/modals/views/ProposePopUpBalance.vue";
import NewBitModal from "@/components/modals/views/NewBitModal.vue";
import UpdatePassword from "@/components/modals/views/UpdatePassword.vue";
import UpdateProfile from "@/components/modals/views/UpdateProfile.vue";
import ForgotPassword from "@/components/modals/views/ForgotPassword.vue"
import ShareBet from "@/components/modals/views/ShareBet.vue"
import TransactionModal from "@/components/modals/views/TransactionModal.vue";

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

    case "new-bit-modal":
      return NewBitModal

    case "update-password-modal":
      return UpdatePassword;

    case "update-profile-modal":
      return UpdateProfile;

    case "forgot-password-modal":
      return ForgotPassword;

    case "share-bet-modal":
      return ShareBet;

    case "tranzaction-modal":
      return TransactionModal;

    default:
      console.warn(`No handle for such modal name - ${modalName}`);
      return null;
  }
}
