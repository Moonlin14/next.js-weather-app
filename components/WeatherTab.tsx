import { FC } from "react";
import { WeatherData } from "@/types/wethear";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface tabProps {
  data: WeatherData[],
  onClick: (index: number) => void,
  index: number,
  active: number
}

export const WeatherTab: FC<tabProps> = ({ data, onClick, index, active }) => {
  const date = new Intl.DateTimeFormat("ru-RU", { weekday: 'short'}).format(new Date(data[0].dt_txt));
  let { weather } = data[0]
  const temp = data.map((item) => Math.round(item.main.temp));
  const maxTemp = Math.max(...temp);
  const minTemp = Math.min(...temp);
  if (data.length === 9) weather = data[4].weather;

  return (
    <motion.div 
    onClick={() => onClick(index)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ delay: 0.3 }}
    className="w-38"
    >
      <motion.div whileHover={{ scale: 1.03 }}>
        <Card className={`bg-white/50 backdrop-blur border-4 border-solid border-transparent ${active === index ? 'border-b-blue-400 rounded-xl' : ''}`}>
          <CardContent className="flex items-center">
            <h3 className="font-bold first-line:uppercase text-sm">{date}</h3>
            <Image 
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].description}
              width={32}
              height={32}
            />
            <div>{`${maxTemp} \\ ${minTemp}°C`}</div>
          </CardContent>
        </Card> 
      </motion.div>
    </motion.div>
  )
}