import React from 'react';

const brands = [
  {
    logo: <span className="text-[48px] font-bold text-[#E04403] opacity-10">REFY</span>,
    items: ['Брови', 'Губы', 'Кисти', 'Тон'],
    img: null,
  },
  {
    logo: <img src="/images/brand1.jpg" alt="Rhode" className="mx-auto max-h-48 object-contain" />,
    items: ['Уход для лица', 'Бальзам для губ', 'Очищение', 'Увлажнение'],
    img: null,
  },
  {
    logo: <span className="text-[36px] font-bold text-[#E04403] opacity-10">SOL DE JANEIRO</span>,
    items: ['Уход для тела', 'Парфюм', 'Мисты для тела', 'Тревел-наборы'],
    img: null,
  },
  {
    logo: <img src="/images/brand2.jpg" alt="Gisou" className="mx-auto max-h-48 object-contain" />,
    items: ['Масло для волос', 'Бальзам для губ', 'Уход для волос', 'Масло для тела'],
    img: null,
  },
];

const BrandsSection = () => {
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-[1312px] mx-auto px-4">
        {/* Верхняя строка */}
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-[#E04403] text-3xl font-medium leading-none">Бренды</h2>
          <button className="text-[#E04403] text-xs tracking-widest font-medium uppercase hover:underline">Смотреть все</button>
        </div>
        {/* Сетка брендов */}
        <div className="grid grid-cols-4 gap-6">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="bg-[#F6E7E3]/40 h-[420px] flex flex-col justify-between items-stretch rounded-md shadow-sm relative"
            >
              {/* Лого или картинка бренда */}
              <div className="flex-1 flex items-center justify-center">
                {brand.logo}
              </div>
              {/* Список категорий */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#5E2A2B] text-sm font-museo">
                  {brand.items.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection; 