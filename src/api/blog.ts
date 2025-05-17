import api from "@/lib/api";

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

interface PaginatedResponse<T> {
  count: number; // Общее количество элементов
  next: string | null; // Ссылка на следующую страницу (если есть)
  previous: string | null; // Ссылка на предыдущую страницу (если есть)
  results: T[]; // Массив элементов текущей страницы
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
  text: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
}

// Функция для получения категорий с пагинацией
export const getBlogsCategories = async (
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<BlogCategory>> => {
  try {
    const response = await api.get<PaginatedResponse<BlogCategory>>(
      "/blogs/category",
      {
        params: {
          page, // Номер страницы
          per_page: perPage, // Количество элементов на странице
        },
      }
    );

    // Возвращаем данные из API
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе категорий:", error);
    throw error; // Пробрасываем ошибку дальше для обработки
  }
};

// Функция для получения категории по slug
export const getBlogCategoryBySlug = async (
  slug: string
): Promise<BlogCategory> => {
  try {
    const response = await api.get<BlogCategory>(`/blogs/category/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при запросе категории с slug: ${slug}`, error);
    throw error; // Пробрасываем ошибку дальше для обработки
  }
};

// Функция для получения постов с пагинацией
export const getBlogPosts = async (
  page: number = 1,
  perPage: number = 10
): Promise<PaginatedResponse<BlogPost>> => {
  try {
    const response = await api.get<PaginatedResponse<BlogPost>>("/blogs/post", {
      params: {
        page, // Номер страницы
        per_page: perPage, // Количество элементов на странице
      },
    });

    // Возвращаем данные из API
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе постов:", error);
    throw error; // Пробрасываем ошибку дальше для обработки
  }
};
