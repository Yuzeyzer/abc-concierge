import api from "@/lib/api";
import { AxiosError } from "axios";

interface CreateUser {
  first_name: string; // Имя пользователя
  last_name: string; // Фамилия пользователя
  middle_name?: string; // Отчество пользователя
  email: string; // Электронная почта
  password: string; // Пароль
}

interface LoginUser {
  email: string;
  password: string;
}

interface AuthTokens {
  refresh_token: string;
  access_token: string;
  errors?: string[];
}

export interface UserProfile {
  profile_image: string; // Формат изображения (например, jpg, png)
  first_name: string; // Имя пользователя
  last_name: string; // Фамилия пользователя
  middle_name: string; // Отчество пользователя
  date_of_birth: string; // Дата рождения в формате YYYY-MM-DD
  gender: "M" | "F"; // Пол: M (мужской), F (женский)
  email: string; // Электронная почта
}

export const registerUser = async (
  data: CreateUser
): Promise<AuthTokens | undefined> => {
  localStorage.removeItem("token");

  try {
    const response = await api.post<AuthTokens>("/users/register", data);

    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }

    return response.data;
  } catch (error) {
    console.error("Не получилось создать пользователя", error);
  }
};

// fetch('https://dev.abc-concierge.com/api/v1/users/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     email: 'admin2@gmail.com',
//     password: '123456'
//   }),
// })

export const loginUser = async (
  data: LoginUser
): Promise<AuthTokens | undefined> => {
  localStorage.removeItem("token");

  try {
    const response = await api.post<AuthTokens>("/users/login", data);

    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
    }

    return response.data;
  } catch (request: any | AxiosError) {
    throw Error(request?.response?.data?.errors[0]?.message);
  }
};

export const deleteUser = async () => {
  try {
    await api.delete("/users/profile/delete");
  } catch (err) {
    console.error("Не получилось удалить аккаунт", err);
  }
};

export const editUser = async (
  data: UserProfile
): Promise<UserProfile | undefined> => {
  try {
    const response = await api.patch<UserProfile>("/users/profile/edit", data);

    return response.data;
  } catch (err) {
    console.error("Не получилось редактировать аккаунт", err);
  }
};

export const changeUserEmail = async (email: string): Promise<void> => {
  try {
    await api.patch<string>("/users/profile/email/change", { email });
  } catch (err) {
    console.error("Не получилось редактировать аккаунт", err);
  }
};

export const confirmUserEmail = async (): Promise<void> => {
  try {
    await api.post("/users/profile/email/confirm");
  } catch (err) {
    console.error("Не получилось редактировать аккаунт", err);
  }
};

export const getUserProfile = async (): Promise<UserProfile | undefined> => {
  try {
    const response = await api.get<UserProfile>("/users/profile/info");
    return response.data;
  } catch (err) {
    console.error("Не получилось получить аккаунт", err);
  }
};
