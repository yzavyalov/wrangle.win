import { set } from "@vueuse/core";

export default {
  toggleSortBy() {
    // desc | asc
    const newState = this.sortBy === 'asc' ? 'desc' : 'asc';
    this.sortBy = newState;
  },

  setFilters(filters) {
    this.filters = {
      ...this.filters,
      ...filters,
    };
  },

  setCurrency(currency) {
    this.currentcy = currency;
  },

  setCategories(categories) {
    this.categories = categories;
  },

  setSelectedCategories(categories) {
    this.selectedCategories = selectedCategories;
  },

  toggleSelectedCategory(category) {
    const index = this.selectedCategories.indexOf(category);

    if (index !== -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
  },
};
