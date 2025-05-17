
export const useHistory = () => {

  const getQueryParam = (key: string) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(key);
  };

  const setQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);

    window.history.replaceState(null, '', url.pathname + url.search);
  };

  const removeQueryParam = (key: string) => {
    const url = new URL(window.location.href);

    // Видаляємо параметр
    url.searchParams.delete(key);

    // Замінюємо URL в адресному рядку без перезавантаження
    window.history.replaceState(null, '', url.pathname + url.search);
  };

  return {
    getQueryParam,
    setQueryParam,
    removeQueryParam,
  };
}
