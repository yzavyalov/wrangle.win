export const useUserAccessToken = () => {

  const AUTH_ACCESS_TOKEN_KEY = "access_token";

  const getUserAccessToken = () => localStorage.getItem(AUTH_ACCESS_TOKEN_KEY) || null;

  const setUserAccessToken = (token: string) => localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, token);

  const removeUserAccessToken = () => {
    const token = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
    if (!token) { return; }
    localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY)
  };

  return {
    getUserAccessToken,
    setUserAccessToken,
    removeUserAccessToken,
    AUTH_ACCESS_TOKEN_KEY,
  };
};
