import React from 'react';
import { Button } from '@/components/ui/button';

const ConsultationSection = () => {
  return (
    <section className="relative w-full h-[712px] overflow-hidden">
      {/* Фоновое изображение с затемнением */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/consultation-bg.jpg" 
          alt="Консультация фон" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Контентный блок */}
      <div className="relative z-10 container mx-auto h-full flex items-center justify-end">
        <div className="w-[547px] p-5">
          <div className="bg-transparent border border-[#FFF9F8] p-10 flex flex-col gap-10">
            <h2 className="text-4xl text-center font-medium text-white">
              Индивидуальная консультация
            </h2>
            
            <p className="text-lg text-center font-light text-white font-museo">
              Мы предлагаем уникальные консультации, в ходе которых подбираем товары от ведущих мировых брендов, идеально соответствующие вашим потребностям.
            </p>

            <div className="flex gap-10">
              <Button 
                className="flex-1 bg-[#E04403] hover:bg-[#E04403]/90 text-white h-12"
              >
                Telegram
              </Button>
              <Button 
                className="flex-1 bg-[#E04403] hover:bg-[#E04403]/90 text-white h-12"
              >
                Whatsapp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSection; 