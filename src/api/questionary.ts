import api from "@/lib/api";

interface QuestionResponseProps {
  id: number;
  name: string;
  email: string;
  question: string;
  created_at: Date;
}

interface QuestionaryRequestProps {
  name: string;
  email: string;
  question: string;
}

interface VacancyResponseProps {
  id: number;
  fio: string;
  email: string;
  phone: string;
  address: string;
  about_yourself: string;
  created_at: Date;
}

interface VacancyRequestProps {
  fio: string;
  email: string;
  phone: string;
  address: string;
  about_yourself: string;
}

interface CertificateResponseProps {
  id: number;
  buyer_fio: string;
  buyer_email: string;
  addressee_name: string;
  summa: string;
  addressee_message: string;
  created_at: Date;
}

interface CertificateRequestProps {
  buyer_fio: string;
  buyer_email: string;
  addressee_name: string;
  summa: string;
  addressee_message: string;
}

export const createQuestion = async (
  data: QuestionaryRequestProps
): Promise<QuestionResponseProps | undefined> => {
  try {
    const response = await api.post<QuestionResponseProps>(
      "/questionary/question",
      data
    );
    return response.data;
  } catch (err) {
    console.error("Не получилось получить страницу доставки", err);
  }
};

export const createVacancy = async (
  data: VacancyRequestProps
): Promise<VacancyResponseProps | undefined> => {
  try {
    const response = await api.post<VacancyResponseProps>(
      "/questionary/about-me",
      data
    );
    return response.data;
  } catch (err) {
    console.error("Не получилось создать вакансию", err);
  }
};

export const createCertificate = async (
  data: CertificateRequestProps
): Promise<CertificateResponseProps | undefined> => {
  try {
    const response = await api.post<CertificateResponseProps>(
      "/questionary/gift-certificate-order",
      data
    );
    return response.data;
  } catch (err) {
    console.error("Не получилось создать вакансию", err);
  }
};
