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

  getCurrency: (state) => {
    return state.currency;
  },

  getSearchQuery: (state) => {
    return state.searchQuery;
  },

  getIsLastPage: (state) => {
    return state.isLastPage;
  },

  getPagination: (state) => {
    return state.pagination;
  },
};
