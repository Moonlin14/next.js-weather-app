'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { getWheatherData } from "./action";
import { WeatherData } from "@/types/wethear";
import { motion } from "framer-motion";
import SubmitButton from "@/components/SubmitButton";
import SelectedTab from "@/components/SelectedTab";

const dataFilter = (data: WeatherData[]): WeatherData[][] => {
  return data.reduce((acc: WeatherData[][], item, index) => {
    const currentTime = item.dt_txt.split(' ')[1].split(':')[0];
    const lastColl = acc.length - 1;
    if(acc.length === 0) {
      acc.push([item]);
      return acc;
    };
    if(currentTime === '03') {
      acc.push([data[index - 1], item]);
      return acc;
    };
    acc[lastColl].push(item);
    return acc;
  }, []);
};

export default function Home() {
  const [data, setData] = useState<WeatherData[][]>([]);
  const [error, setError] = useState<string | undefined>('');
  const [city, setCity] = useState('');
  
  const handleSearch = async (formData: FormData) => {
    setError('');
    setData([]);
    const city = formData.get('city') as string;
    const { data, error: weatherError } = await getWheatherData(city);
    
    if (weatherError) {
      setError(weatherError);
      setData([]);  
    }
    if (data) {
      setData(dataFilter(data));
      setCity(city)
      console.log(data);
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-700 p-4 flex items-center justify-center transition-colors">
      <div className="w-full max-w-md space-y-4">
        <form noValidate action={handleSearch} className="flex gap-2">
          <Input
          autoComplete="off"
          name="city"
          type="text"
          placeholder="Напишите название города..."
          className="bg-blue-400 border border-solid border-transparent focus:border-white duration-500 ease-linear shadow-slate-200"
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

        { data[0] && (
          <SelectedTab data={data[0]} city={city}/>
        )} 
      </div>
    </div>
  );
}