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
    this.sortBy = sortByFromLocalStore || 'desc';
  },
};
