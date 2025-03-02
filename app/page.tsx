'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { getWheatherData } from "./action";
import { WeatherData } from "@/types/wethear";
import { motion } from "framer-motion";
import SubmitButton from "@/components/SubmitButton";
import SelectedTab from "@/components/SelectedTab";
import { WeatherTab } from "@/components/WeatherTab";

const dataFilter = (data: WeatherData[]): WeatherData[][] => {
  const result = data.reduce((acc: WeatherData[][], item, index) => {
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
  
  return result.slice(0, 5);
};

export default function Home() {
  const [data, setData] = useState<WeatherData[][]>([]);
  const [error, setError] = useState<string | undefined>('');
  const [city, setCity] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  
  const handleSearch = async (formData: FormData) => {
    setError('');
    setData([]);
    setSelectedTab(0)
    const city = formData.get('city') as string;
    const { data, error: weatherError } = await getWheatherData(city);
    
    if (weatherError) {
      setError(weatherError);
      setData([]);  
    }
    if (data) {
      setData(dataFilter(data));
      setCity(city);
      console.log(dataFilter(data));
    }
    
  };

  const handleClick = (index: number) => {
    setSelectedTab(index);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-700 p-4 flex items-center justify-center transition-colors">
      <div className="w-full max-w-xl space-y-4">
        <form noValidate action={handleSearch} className="flex gap-2">
          <Input
          autoComplete="off"
          name="city"
          type="text"
          placeholder="Напишите название города..."
          className="bg-blue-400 border-2 border-solid border-transparent focus:border-white duration-500 ease-linear shadow-slate-200 max-w-sm"
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

        { data.length > 1 && (
          <div className="flex flex-wrap flex-row gap-2">
            <SelectedTab data={data[selectedTab]} city={city}/>
            <div className="flex flex-col justify-between">
            { data.map((item, index) => <WeatherTab data={item} onClick={handleClick} key={index} index={index} active={selectedTab}/>) }
            </div>
          </div>          
        )} 
      </div>
    </div>
  );
}