'use server';

import { WeatherData } from "@/types/wethear";
import { z } from "zod";

const weatherSchema = z.object({
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
    feels_like: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ),
  wind: z.object({
    speed: z.number(),
  }),
  dt: z.number(),
  dt_txt: z.string()
})

export const getWheatherData = async (city: string): Promise<{ data?: WeatherData[], error?: string}> => {
  try {
    if (!city.trim()) {
      return { error: "City name is required" };
    }
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
    if (!res.ok) {
      throw new Error('City not found')
    }
    const { list } = await res.json();
    const result: WeatherData[] = [];
    for(const data of list) {
      const validData = weatherSchema.parse(data);
      result.push(validData);
    }
    return { data: result };
  } catch (err) {
    if (err instanceof z.ZodError) return { error: "Invalid weather data recived" };

    return { error: err instanceof Error ? err.message : "Failed to fetch weather data" }
  }
}