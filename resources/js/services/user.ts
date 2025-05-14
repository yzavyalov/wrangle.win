import { http } from "@/api/http";
import { AUTH } from "@/api/enpoints";
import { useUserStore } from "@/store/user";
import { HTTPResponse } from "@/types/http";

export const register = async (payload: RegisterPayload) => {
  return await http.post(AUTH.URL_REGISTER, payload)
  .then(res => {
    console.log(res, "res - register");
    const { data: { data }, success } = res;

    if (!success) { return false; }

    return data;
  })
  .catch(e => console.error(e.message));
}

export const login = async (payload: LoginPayload) => {

  return await http.post(AUTH.URL_LOGIN, payload)
  .then(res => {
    console.log(res, "res - login");
    if (!res?.data?.data) { return false; }

    const user = res.data.data;

    const { token } = user;

    token && localStorage.setItem("access_token", token);

    useUserStore().updateUser(user);

    return user;
  })
  .catch(e => console.error(e.message));
};

export const loginWithSocial = async (social: SocialLoginType) => {

  const baseUrl = `/api/auth/${social}/redirect`;

  return await http.get(baseUrl)
  .then(res => {
    console.log(res, "res - loginWithSocial");
    if (!res?.data?.data) { return false; }

    const user = res.data.data;

    const { token } = user;

    token && localStorage.setItem("access_token", token);

    useUserStore().updateUser(user);

    return user;
  })
  .catch(e => console.error(e.message));
};

export const logout = async () => {

  return await http.post(AUTH.URL_LOGOUT)
  .then(res => {
    console.log(res, "res - logout");

    useUserStore().logout();

    localStorage.removeItem("access_token")

    return ;
  })
  .catch(e => console.error(e.message));
};

export const getUserData = async () => {

  return await http.get(AUTH.URL_USER)
  .then(res => {
    console.log(res, "res - getUserData");

    const user = res?.data?.data;

    user && useUserStore().updateUser(user);

    return res.data;
  })
  .catch(e => console.error(e.message));
};
