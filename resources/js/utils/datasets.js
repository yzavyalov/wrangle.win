export const PAGE_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  POLITICS: "/terms",
  RULES: "/rules",
  PRIVACY: "/privacy_policy",
  EVENTS: "/events",            // no page
  PROFILE: "/profile",
  CATEGORIES: "/categories",
  NEW_BET: "/new_bet",
  LOGIN: "/login",
  REGISTER: "/register",
  BET: "/bet",

  POPULAR: "/popular",          // no page
  PREDICTION: "/prediction",    // temp page
}

export const sideBarLinks = [
  { id: 'about', name: "About", path: PAGE_ROUTES.ABOUT },
  { id: 'politics', name: "Politics", path: PAGE_ROUTES.POLITICS },
  { id: 'rules', name: "Rules", path: PAGE_ROUTES.RULES },
  { id: 'privacy', name: "Privacy policy", path: PAGE_ROUTES.PRIVACY },
  { id: 'events', name: "All Events", path: PAGE_ROUTES.CATEGORIES },
  { id: 'account', name: "To Account", path: PAGE_ROUTES.PROFILE },
];

export const headerLinks = [
  { id: 'categories', name: "All categories", path: PAGE_ROUTES.CATEGORIES },
  { id: 'popular', name: "Popular", path: PAGE_ROUTES.POPULAR },
  { id: 'prediction', name: "Prediction", path: PAGE_ROUTES.PREDICTION },
  { id: 'new_bet', name: "New bet", path: PAGE_ROUTES.NEW_BET },
];

export const profileMenuLinks = [
  { id: 1, name: "Upload Profile picture", action: "change_avatar" },
  { id: 2, name: "Change username", action: "change_username" },
  { id: 3, name: "Change Password", action: "change_password" },
  { id: 4, name: "Delete Account", action: "delete_account" },
  { id: 5, name: "Logout", action: "logout" },
];

export const footerMenuLinks = [
  { id: 'about', name: "About", path: PAGE_ROUTES.ABOUT },
  { id: 'politics', name: "Politics", path: PAGE_ROUTES.POLITICS },
  { id: 'rules', name: "Rules", path: PAGE_ROUTES.RULES },
  { id: 'events', name: "All Events", path: PAGE_ROUTES.CATEGORIES },
  { id: 'new_bet', name: "New bet", path: PAGE_ROUTES.NEW_BET },
  { id: 'account', name: "To Account", path: PAGE_ROUTES.PROFILE },
];
