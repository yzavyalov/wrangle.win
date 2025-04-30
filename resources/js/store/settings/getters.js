import { get } from "@vueuse/core";

export default {
  getSortBy: (state) => {
    return state.sortBy;
  },

  getCategories: (state) => {
    return state.categories;
  },

  getSelectedCategories: (state) => {
    return state.selectedCategories;
  },

  getFilters: (state) => {
    return state.filters;
  },

  getCurrentcy: (state) => {
    return state.currentcy;
  },
};
