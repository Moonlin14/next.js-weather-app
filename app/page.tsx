'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getWheatherData } from "./action";
import { WeatherData } from "@/types/wethear";
import { error } from "console";

const SubmitButton = () => {
  return (
    <Button type="submit">
      <Search className="w-4 h-4" />
    </Button>
  )
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | undefined>('')
  
  const handleSearch = async (formData: FormData) => {
    setError('')
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
          name="city"
          type="text"
          placeholder="Enter city name..."
          className="bg-wgite/90"
          required
          />   
          <SubmitButton />
        </form>  

        { error && (
          <div className="text-center text-black-300 bg-red-500/30 rounded-md p-2">{error}</div>
        )}

        {weather && (
            <div>
              <Card className="bg-white/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">{weather.name}</h2>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                      width={64}
                      height={64}
                      />
                      <div className="text-4xl font-bold">{Math.round(weather.main.temp)}°</div>
                    </div>
                    <div className="text-gray-600 mt-1 capitalize">{weather.weather[0].description}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <Thermometer className="w-6 h-6 mx-auto text-red-500"/>
                      <div className="mt-2 text-sm text-gray-600">Feels like</div>
                      <div className="font-semibold">{Math.round(weather.main.feels_like)}°</div>
                    </div>
                    <div className="text-center">
                      <Droplets className="w-6 h-6 mx-auto text-blue-500"/>
                      <div className="mt-2 text-sm text-gray-600">Humidity</div>
                      <div className="font-semibold">{Math.round(weather.main.humidity)}%</div>
                    </div>
                    <div className="text-center">
                      <Wind className="w-6 h-6 mx-auto text-teal-500"/>
                      <div className="mt-2 text-sm text-gray-600">Wind</div>
                      <div className="font-semibold">{Math.round(weather.wind.speed)}m/s</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )} 
      </div>
    </div>
  );
}
