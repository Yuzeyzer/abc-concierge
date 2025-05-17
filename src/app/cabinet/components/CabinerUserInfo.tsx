import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import React from "react";

const CabinerUserInfo = () => {
  return (
    <div className="flex flex-col sm:py-16 sm:gap-16 gap-8">
      <div>
        <div className="flex justify-between items-start">
          <Typography tag="h6" className="font-museo sm:text-2xl">
            ДАННЫЕ
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
            Мадина Талантова
          </Typography>
          <Typography
            tag="span"
            className="font-museo text-[#6D6D74] sm:text-xl"
          >
            madinatalantova@gmail.com
          </Typography>
        </div>
      </div>
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
