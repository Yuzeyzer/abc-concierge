import api from "@/lib/api";

export interface DeliveryPage {
  id: number; // Уникальный идентификатор объявления
  title: string; // Заголовок объявления
  main_poster: string; // URL или строка для главного постера
  text: string; // Основной текст объявления
  email: string; // Email контакта
  phone: string; // Номер телефона
  whatsapp: string; // Контакт WhatsApp
  telegram: string; // Контакт Telegram
}

export interface AboutUsPageProps {
  id: number;
  title: string;
  sub_title: string;
  main_poster: string;
  about_title: string;
  about_text: string;
  about_poster: string;
  work_title: string;
  work_text: string;
  work_poster: string;
  is_featured: boolean;
}

export interface CertificatePageProps {
  id: number; // Уникальный идентификатор
  main_poster: string; // URL или строка для главного постера
  title: string; // Заголовок
  subtext: string; // Подтекст или описание
  email: string; // Email контакта
  phone: string; // Номер телефона
  whatsapp: string; // Контакт WhatsApp
  telegram: string; // Контакт Telegram
}

export const getDeliveryPage = async (): Promise<DeliveryPage | undefined> => {
  try {
    const response = await api.get<DeliveryPage>(`/pages/delivery/featured`);
    return response.data;
  } catch (err) {
    console.error("Не получилось получить страницу доставки", err);
  }
};

export const getAboutUsPage = async (): Promise<
  AboutUsPageProps | undefined
> => {
  try {
    const response = await api.get<AboutUsPageProps>(
      `/pages/about_us/featured`
    );
    return response.data;
  } catch (err) {
    console.error("Не получилось получить страницу о нас", err);
  }
};

export const getCertificatePage = async (): Promise<
  CertificatePageProps | undefined
> => {
  try {
    const response = await api.get<CertificatePageProps>(
      `/pages/gift_certificate/featured`
    );
    return response.data;
  } catch (err) {
    console.error("Не получилось получить страницу сертификаты", err);
  }
};
