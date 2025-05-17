import axios from 'axios';

// for server components
export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 130000,
  withCredentials: true
})

// client side api
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Базовый URL для запросов
  timeout: 130000, // Таймаут в миллисекундах,
  // withCredentials: true
});

const noAuthRequiredPaths = ['/delivery', '/about_us', '/pages/gift_certificate/featured'];

// Добавляем интерсептор запросов
api.interceptors.request.use(
  (config) => {
    if (!localStorage) return config;
  
    const token = localStorage?.getItem('token');
    if (token && noAuthRequiredPaths.every((path) => !config.url?.includes(path))) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Обработка ошибок перед отправкой запроса
    return Promise.reject(error);
  }
);

// Добавляем интерсептор ответов
api.interceptors.response.use(
  (response) => {
    // Например, обрабатываем успешный ответ
    return response;
  },
  (error) => {
    // Например, перехватываем 401 ошибку
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Логика выхода из аккаунта или перенаправления на страницу входа
    }
    return Promise.reject(error);
  }
);

export default api;
