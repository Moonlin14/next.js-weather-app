'use server';

export const getWheatherData = async (city: string) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}