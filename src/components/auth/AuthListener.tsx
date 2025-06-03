'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, logoutUser } from '@/features/user/userSlice';
import { auth } from '@/firebase/auth';  // <-- импорт auth из файла инициализации

export const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'user', // позже можно получить роль из БД
        }));
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};
