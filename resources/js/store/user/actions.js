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


  logout() {
    this.user = null;
  },
};
