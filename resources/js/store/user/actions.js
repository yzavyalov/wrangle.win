export default {
  setUser(userData) {
    this.user = userData;
  },

  updateUser(updatedUser) {
    if (!this.user) {
      this.user = {};
    }

    this.user = {
      ...this.user,
      ...updatedUser,
    };
  },

  updateUserBalance(updatedBalance) {
    if (!this.user?.balance) {
      this.user.balance = {};
    }

    this.user.balance.balance = Number(updatedBalance);
  },


  logout() {
    this.user = null;
  },
};
