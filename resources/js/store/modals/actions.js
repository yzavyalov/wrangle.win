export default {
  newModal(modalName) {
    this.modals.push(modalName);
  },

  closeModal(modalName) {

    if (modalName) {
      const index = this.modals.findIndex((item) => item === modalName);
      if (index !== -1) {
        this.modals.splice(index, 1);
      }
      return;
    }

    this.modals.pop();
  },

};
