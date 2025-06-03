import axios from "axios";

export const serverApi = axios.create({
  baseURL: "https://dev.abc-concierge.com/api/v1", // или свой
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 📌 ДОБАВЛЯЕМ токен перед каждым запросом
serverApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ Токен добавлен в заголовки");
  } else {
    console.warn("⛔ Пользователь не авторизован — токен не будет отправлен.");
  }
  return config;
});
