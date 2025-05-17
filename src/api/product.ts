import api, { serverApi } from "@/lib/api";

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductProps[];
}

export interface ProductProps {
  id: number;
  name: string;
  slug: string;
  poster: string;
  brand: Brand;
  sub_products: SubProduct[];
  is_favorite: boolean;
}

interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

interface SubProduct {
  id: number;
  slug: string;
  product: number;
  size: number;
  color: number;
  stock: number;
  is_available: boolean;
  final_price: number;
}

interface ProductQueryParams {
  brand?: number[]; // массив ID брендов
  category?: number[]; // массив ID категорий
  is_back_in_stock?: boolean;
  is_bestseller?: boolean;
  is_novelty?: boolean;
  is_recommendation?: boolean;
  page?: number;
  per_page?: number;
  price_max?: number;
  price_min?: number;
  search?: string;
}

export const getProducts = async (params?: ProductQueryParams) => {
  let data: ProductsResponse | undefined;
  let errors = [];
  try {
    const response = await serverApi.get("/product/", {
      params,
    });
    data = response.data;
  } catch (err: any) {
    errors = err;
  }

  return { data, errors };
};

export const getProductById = async (
  id: string
): Promise<ProductProps | unknown> => {
  try {
    const res = await serverApi.get("/product/" + id);

    return res.data;
  } catch (err) {
    return err;
  }
};
