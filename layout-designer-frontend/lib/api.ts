import api from "./axios";

// LOGIN
export const login = async (email: string, password: string) => {
  const response = await api.post("authentication/login/", { email, password });
  return response.data; // contiene access, refresh y user
};

// LOGOUT
export const logout = async (refreshToken: string, accessToken: string) => {
  const response = await api.post(
    "authentication/logout/",
    { refresh: refreshToken },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};

// REGISTER
export const register = async (username: string, email: string, password: string) => {
  const response = await api.post("auth/users/", {
    username,
    email,
    password,
  });
  return response.data;
};
