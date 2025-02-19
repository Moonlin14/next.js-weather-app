'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getWheatherData } from "./action";
import { WeatherData } from "@/types/wethear";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      <Search className={`h-4 w-4 ${pending ? 'animate-spin' : ''}`} />
    </Button>
  )
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | undefined>('')
  
  const handleSearch = async (formData: FormData) => {
    setError('');
    setWeather(null);
    const city = formData.get('city') as string;
    const { data, error: weatherError } = await getWheatherData(city);
    if (weatherError) {
      setError(weatherError);
      setWeather(null);  
    }
    if (data) setWeather(data);

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-700 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form noValidate action={handleSearch} className="flex gap-2">
          <Input
          autoComplete="off"
          name="city"
          type="text"
          placeholder="Enter city name..."
          className="bg-blue-400"
          required
          />   
          <SubmitButton />
        </form>  

        { error && (
          <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center text-black-300 bg-red-500/30 rounded-md p-2">{error}</motion.div>
        )}

        {weather && (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3}}
            >
              <Card className="bg-white/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <motion.h2 
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1}}
                    className="text-2xl font-bold">{weather.name}</motion.h2>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Image
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width={64}
                      height={64}
                      />
                      <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2}}
                      className="text-4xl font-bold">{Math.round(weather.main.temp)}°</motion.div>
                    </div>
                    <div className="text-gray-600 mt-1 capitalize">{weather.weather[0].description}</div>
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
                      <div className="mt-2 text-sm text-gray-600">Feels like</div>
                      <div className="font-semibold">{Math.round(weather.main.feels_like)}°</div>
                    </motion.div>
                    <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="text-center">
                      <Droplets className="w-6 h-6 mx-auto text-blue-500"/>
                      <div className="mt-2 text-sm text-gray-600">Humidity</div>
                      <div className="font-semibold">{Math.round(weather.main.humidity)}%</div>
                    </motion.div>
                    <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="text-center">
                      <Wind className="w-6 h-6 mx-auto text-teal-500"/>
                      <div className="mt-2 text-sm text-gray-600">Wind</div>
                      <div className="font-semibold">{Math.round(weather.wind.speed)}m/s</div>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )} 
      </div>
    </div>
  );
}
