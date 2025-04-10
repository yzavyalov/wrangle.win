export default {
  setUser(userData) {
    this.user = userData;
  },

  updateUser(updatedUser) {
    this.user = {
      ...this.user,
      ...updatedUser,
    };
  },
};
