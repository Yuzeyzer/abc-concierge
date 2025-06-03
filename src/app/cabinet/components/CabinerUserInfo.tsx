'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { setUser } from '@/features/user/userSlice';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';

const CabinerUserInfo = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [email, setEmail] = useState(user.email || '');

  const handleSave = async () => {
    if (!user.uid) return;

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName,
        email,
      });

      dispatch(setUser({
        ...user,
        displayName,
        email,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      alert('Не удалось сохранить изменения');
    }
  };

  return (
    <div className="flex flex-col sm:py-16 sm:gap-16 gap-8">
      {/* Блок данных */}
      <div>
        <div className="flex justify-between items-start">
          <Typography tag="h6" className="font-museo sm:text-2xl">
            ДАННЫЕ
          </Typography>
          {isEditing ? (
            <Button
              variant="link"
              className="py-0 sm:text-xs"
              onClick={handleSave}
            >
              СОХРАНИТЬ
            </Button>
          ) : (
            <Button
              variant="link"
              className="py-0 sm:text-xs"
              onClick={() => setIsEditing(true)}
            >
              ИЗМЕНИТЬ
            </Button>
          )}
        </div>

        <div className="flex flex-col pt-5 gap-3">
          {isEditing ? (
            <>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border px-3 py-2 rounded text-sm"
                placeholder="Имя"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-3 py-2 rounded text-sm"
                placeholder="Email"
              />
            </>
          ) : (
            <>
              <Typography
                tag="span"
                className="font-museo text-[#6D6D74] sm:text-xl"
              >
                {user?.displayName || 'Имя не указано'}
              </Typography>
              <Typography
                tag="span"
                className="font-museo text-[#6D6D74] sm:text-xl"
              >
                {user?.email || 'Почта не указана'}
              </Typography>
            </>
          )}
        </div>
      </div>

      {/* Блок пароля (без изменений пока) */}
      <div>
        <div className="flex justify-between items-start">
          <Typography tag="h6" className="font-museo sm:text-2xl">
            ПАРОЛЬ
          </Typography>
          <Button variant="link" className="py-0 sm:text-xs">
            ИЗМЕНИТЬ
          </Button>
        </div>
        <div className="flex flex-col pt-5 gap-1">
          <Typography
            tag="span"
            className="font-museo text-[#6D6D74] sm:text-xl"
          >
            ••••••••••
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CabinerUserInfo;
