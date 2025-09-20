import { defaultFilters } from '@/utils/datasets';
import { getFromLocalStorage, setToLocalStorage } from '@/helpers/localStorage';

export default {
  toggleSortBy() {
    // desc | asc
    const newState = this.sortBy === 'asc' ? 'desc' : 'asc';
    this.sortBy = newState;

    setToLocalStorage('sortBy', newState);
  },

  setFilters(filters) {
    this.filters = {
      ...this.filters,
      ...filters,
    };
  },

  setCurrency(currency) {
    this.currency = currency;

    localStorage.setItem('currency', currency);
  },

  setCategories(categories) {
    this.categories = categories;
  },

  addCategory(newCategory) {
    this.categories.push(newCategory);
  },

  addCategories(newCategories) {
    console.log(newCategories, 'newCategories - addCategories - from store');
    this.categories.push(...newCategories);
    console.log(this.categories, 'this.categories - addCategories - from store');

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

  setSearchQuery(query) {
    this.searchQuery = query;
  },

  setDefaultSearchParams() {
    this.searchQuery = '';

    this.selectedCategories = [];

    this.filters = defaultFilters;

    const sortByFromLocalStore = getFromLocalStorage('sortBy');
    this.sortBy = sortByFromLocalStore || 'asc';
  },

  setIsLastPage(isLastPage) {
    this.isLastPage = isLastPage;
  },

  setPagination(pagination) {
    this.pagination = pagination;
  },
};
