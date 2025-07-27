export const AUTH = {
  URL_LOGIN: "/login",
  URL_REGISTER: "/register",

  URL_LOGOUT: "/api/logout",
  URL_RESET_PASSWORD: "/api/reset-password",
  URL_FORGOT_PASSWORD: "/api/forgot-password",
  URL_IAFS: "/api/check-user",
  URL_LOGIN_GOOGLE: "/api/auth/google/redirect",
  URL_LOGIN_FACEBOOK: "/api/auth/facebook/redirect",
  URL_LOGIN_FACEBOOK: "/api/auth/telegram/redirect",

  URL_USER: "/api/user",
  URL_PASSWORD: "/api/user/password",
  RESET_PASSWORD: "/api/reset-password",
  FORGOT_PASSWORD: "/api/forgot-password",

  CSRF_TOKEN: "/sanctum/csrf-cookie",
};

export const BETS = {
  URL_BETS: "/api/bets",
  GET_FINISHED: "/api/finish-bets",
  SEARCH_BET: "/api/search-bet",
  TOGGLE_TO_FAVORITE: "/api/favorites",
  GET_OWN: "/api/own-bets",
  GET_FAVORITE: "/api/favorite-bets",
  BIT: "/api/bit",
  HOT: "/api/hot-bets",
  CARUSEL: "/api/bets/carousel",
  OWN_BET: "/api/own-bet"
}

export const CATEGORIES = {
  URL_CATEGORIES: "/api/bet-categories",
  SEARCH_CATEGORY: "/api/search-category",
}

export const USER = {
  URL_USER: "/api/user",
  URL_PASSWORD: "/api/user/password",
  URL_PROFILE: "/api/update-profile",
}

export const TRANSACTIONS = {
  URL_TRANSACTIONS: "/api/transactions",

  METHODS_LOGO: "/api/all-payments-logo"
}

export const PAYMENTS = {
  URL_IN: "/api/payments/in",
  URL_OUT: "/api/payments/out",
  URL_PAYOUT: "/api/payments/out/payout",
}
