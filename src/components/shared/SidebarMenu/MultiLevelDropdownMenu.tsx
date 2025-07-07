import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
  is_featured: boolean;
  parent: number | null;
  category_characteristics: any[];
  children: Category[];
}

interface MultiLevelDropdownMenuProps {
  categories: Category[];
  onSelect: (slug: string) => void;
}

const MultiLevelDropdownMenu: React.FC<MultiLevelDropdownMenuProps> = ({ categories, onSelect }) => {
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

  const handleCategoryClick = (category: Category) => {
    if (category.children && category.children.length > 0) {
      setOpenCategoryId(openCategoryId === category.id ? null : category.id);
    } else {
      onSelect(category.slug);
    }
  };

  const renderCategories = (cats: Category[], level = 0) => (
    <ul className={`ml-${level * 4} pl-0`}> {/* отступ для вложенности */}
      {cats.map((category) => (
        <li key={category.id} className="relative group">
          <button
            className={`w-full text-left py-2 px-4 hover:bg-[#FFEDE5] font-museo font-light text-[#030712] flex items-center justify-between ${openCategoryId === category.id ? 'bg-[#FFEDE5]' : ''}`}
            onClick={() => handleCategoryClick(category)}
            type="button"
          >
            {category.name}
            {category.children && category.children.length > 0 && (
              <span className="ml-2">▶</span>
            )}
          </button>
          {category.children && category.children.length > 0 && openCategoryId === category.id && (
            <div className="absolute left-full top-0 min-w-[200px] z-10 bg-white border shadow-md">
              {renderCategories(category.children, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return <div>{renderCategories(categories)}</div>;
};

export default MultiLevelDropdownMenu; 