import { useEffect, useState } from "react";

export const useFetch = (request: () => Promise<any>) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    request()
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrors(err);
        setIsLoading(false);
      });
  }, [request]);

  return [data, isLoading, errors] as const;
};