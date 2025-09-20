export default () => ({
  currency: "€",

  filters: {
    betAmount: 0,
    finish: '',
  },

  searchQuery: '',

  categories: [],
  selectedCategories: [],

  sortBy: 'asc', // desc | asc

  isLastPage: false,

  pagination: {
    page: 1,
    per_page: 20,
  },

});
