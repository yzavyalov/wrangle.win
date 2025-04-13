import { http } from "@/api/http";
import { AUTH } from "@/api/enpoints";

export const login = (email: string, password: string) => {
  console.warn('No logic in login');

  // return http.post("/login", { email, password });
};

export const logout = () => {
  console.warn('No logic in logout');

  // return http.post("/logout");
};
