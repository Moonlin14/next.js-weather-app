import { FC } from "react";
import { WeatherData } from "@/types/wethear";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer, Droplets, Wind } from "lucide-react";
import Image from "next/image";

interface itemProps {
  data: WeatherData,
}

const SelectedTab: FC<itemProps> = ({ data }) => {
  const { main, weather, wind } = data;

  return (
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: 0.3 }}
      >
        <Card className="bg-white/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <motion.h2 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1}}
                className="text-2xl font-bold">{}</motion.h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Image
                  src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                  alt={weather[0].description}
                  width={64}
                  height={64}
                  />
                  <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2}}
                  className="text-4xl font-bold">{Math.round(main.temp)}°</motion.div>
                </div>
                <div className="text-gray-600 mt-1 capitalize">{weather[0].description}</div>
              </div>
              <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3}}
              className="grid grid-cols-3 gap-4 mt-6">
                <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center">
                  <Thermometer className="w-6 h-6 mx-auto text-red-500"/>
                  <div className="mt-2 text-sm text-gray-600">Ощущается как</div>
                  <div className="font-semibold">{Math.round(main.feels_like)}°</div>
                </motion.div>
                <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center">
                  <Droplets className="w-6 h-6 mx-auto text-blue-500"/>
                  <div className="mt-2 text-sm text-gray-600">Влажность</div>
                  <div className="font-semibold">{Math.round(main.humidity)}%</div>
                </motion.div>
                <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center">
                  <Wind className="w-6 h-6 mx-auto text-teal-500"/>
                  <div className="mt-2 text-sm text-gray-600">Ветер</div>
                  <div className="font-semibold">{Math.round(wind.speed)}м/с</div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
      </motion.div>
  )
};

export default SelectedTab;