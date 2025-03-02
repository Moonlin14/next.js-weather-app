export interface WeatherData {
  dt: number,
  main: {
    temp: number,
    humidity: number,
    feels_like: number,
  },
  weather: Array<{
    main: string,
    description: string,
    icon: string,
  }>,
  wind: {
    speed: number,
  },
  dt_txt: string,
}