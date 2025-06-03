import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/user/userSlice";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    setError("");
    setIsPending(true);

    try {
      // 🔐 Авторизация через Firebase
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (!response) {
        setError("Не получилось войти в систему");
        return null;
      }

      const user = response.user;

      // 📥 Получение токена
      const token = await response.user.getIdToken();
      localStorage.setItem("token", token);
      console.log("✅ Токен сохранён в localStorage:", token);


      // 📚 Получение информации о пользователе из Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        setError("Пользователь не найден в базе данных");
        return null;
      }

      const userData = userDocSnap.data();

      // 🧾 Создаём объект пользователя
      const userWithRole = {
        email: user.email,
        uid: user.uid,
        role: userData.role || "user", // если нет роли — ставим user
      };

      // ✅ Обновляем Redux-стейт
      dispatch(setUser(userWithRole));

      return userWithRole;
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при входе");
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
