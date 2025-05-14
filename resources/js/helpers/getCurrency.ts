import { useSettingsStore } from "@/store/settings";

export const getCurrency = () => {
  const storredCurrency = localStorage.getItem('currency') || undefined;

  if (storredCurrency) { return storredCurrency };

  const defaultCurrency = useSettingsStore().getCurrency;
  useSettingsStore().setCurrency(defaultCurrency);
  localStorage.setItem('currency', defaultCurrency);

  return defaultCurrency;
};
