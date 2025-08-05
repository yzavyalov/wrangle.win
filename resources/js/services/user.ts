import { http } from "@/api/http";
import { AUTH, USER } from "@/api/enpoints";
import { useUserStore } from "@/store/user";
import { HTTPResponse } from "@/types/http";
import { notifyWarning } from "@/helpers/notify";
import { handleErrorNotify } from "@/helpers/errorHandlers";

const AUTH_ACCESS_TOKEN_KEY = "access_token";

export const register = async (payload: RegisterPayload) => {
  return await http.post(AUTH.URL_REGISTER, payload)
  .then(res => {
    console.log(res, "res - register");
    if (!res?.data?.data) { return false; }

    return !!res?.data?.data;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
}

export const login = async (payload: LoginPayload) => {

  return await http.post(AUTH.URL_LOGIN, payload)
  .then(res => {
    console.log(res, "res - login");
    if (!res?.data?.data) { return false; }

    const user = res.data.data;

    const { token } = user;

    token && localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, token);

    useUserStore().updateUser(user);

    return user;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
};

export const loginWithSocial = async (social: SocialLoginType) => {

  const baseUrl = `/auth/${social}/redirect`;

  window.location.href = baseUrl;

  // return await http.get(baseUrl)
  // .then(res => {
  //   console.log(res, "res - loginWithSocial");
  //   if (!res?.data?.data) { return false; }

  //   const user = res.data.data;

  //   const { token } = user;

  //   token && localStorage.setItem("access_token", token);

  //   useUserStore().updateUser(user);

  //   return user;
  // })
  // .catch(e => {
  //   notifyWarning(e?.response?.data?.message || e?.message);
  //   console.error(e?.response?.data?.message || e?.message);
  // });
};

export const logout = async () => {

  return await http.post(AUTH.URL_LOGOUT)
  .then(res => {
    console.log(res, "res - logout");

    useUserStore().logout();

    localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY)

    return ;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
};

export const getUserData = async () => {

  return await http.get(USER.URL_USER)
  .then(res => {
    console.log(res, "res - getUserData");

    const user = res?.data?.data;

    user && useUserStore().updateUser(user);

    return res.data;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
};

export const changeUserPassword = async (payload) => {

  return await http.put(USER.URL_PASSWORD, payload)
  .then(res => {
    console.log(res, "res - changeUserPassword");

    // const user = res?.data?.data;

    // user && useUserStore().updateUser(user);

    return res.data;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
};

export const updateUserProfile = async (payload) => {

  return await http.put(USER.URL_PROFILE, payload)
  .then(res => {
    console.log(res, "res - updateUserProfile");

    const user = res?.data?.data;

    user && useUserStore().updateUser(user);

    return user;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
};

export const resetUserPassword = async (payload: ResetUserPassword) => {

  return await http.post(AUTH.RESET_PASSWORD, payload)
  .then(res => {
    console.log(res, "res - resetUserPassword");
    return res?.data?.success;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
}

export const forgotUserPassword = async (payload: ForgotUserPassword) => {

  return await http.post(AUTH.FORGOT_PASSWORD, payload)
  .then(res => {
    console.log(res, "res - forgotUserPassword");
    return res.data.success;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
}

export const getCSRFToken = async () => {

  return await http.get(AUTH.CSRF_TOKEN)
  .then(res => {
    console.log(res, "res - getCSRFToken");
    return res.data.data;
  })
  .catch(e => {
    handleErrorNotify(e);
  });
}
