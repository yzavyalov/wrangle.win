export const isInLocalStorage = (key: string) => localStorage.getItem(key) !== null;

export const setToLocalStorage = (key: string, value: string) => localStorage.setItem(key, value);

export const getFromLocalStorage = (key: string) => localStorage.getItem(key) || null;
