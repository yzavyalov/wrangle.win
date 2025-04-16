import { http } from "@/api/http";
import { AUTH } from "@/api/enpoints";
import { LoginPayload, RegisterPayload } from "@/types/user";
import { useUserStore } from "@/store/user";

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

    const { user, token } = res?.data;

    token && localStorage.setItem("access_token", token);

    user && useUserStore().updateUser(user);

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const logout = async () => {

  return await http.post(AUTH.URL_LOGOUT)
  .then(res => {
    console.log(res, "res - logout");

    useUserStore().logout();

    return ;
  })
  .catch(e => console.error(e.message));
};
