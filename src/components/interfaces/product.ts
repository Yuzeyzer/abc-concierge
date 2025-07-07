export interface Product {
  id: number;
  name: string;
  slug: string;
  brand?: Brand;
  posters?: Poster[];
  reviews?: Reviews;
  is_favorite: boolean;
  min_price: string;
  min_sale_price: string;
  description: string;
  use: string;
  ingredient: string;
  additional: string;
  category?: Category[];
  characteristics?: Characteristics;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

export interface Poster {
  id: number;
  image: string;
  is_featured: boolean;
  product: number;
}

export interface Reviews {
  avg_rate: number | null;
  count_reviews: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_featured: boolean;
  parent: Category | null;
  category_characteristics: CategoryCharacteristic[];
}

export interface CategoryCharacteristic {
  id: number;
  category: number;
  characteristic: Characteristic;
  required: boolean;
}

export interface Characteristic {
  id: number;
  name: string;
  slug: string;
  unit: string | null;
  description: string;
  position: number;
  type: string;
  color_image: string | null;
  color_hex: string | null;
  weight: number | null;
  volume: number | null;
  is_main: boolean;
}

export interface Characteristics {
  color: ColorCharacteristic[];
}

export interface ColorCharacteristic {
  color_hex: string;
  color_image: string | null;
  type: string;
  is_main: boolean;
  position: number;
  slug: string;
  name: string;
}
