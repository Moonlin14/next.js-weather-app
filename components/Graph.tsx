import { FC } from "react";
import { WeatherData } from "@/types/wethear";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

interface graphProps {
  data: WeatherData[],
}; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const Graph: FC<graphProps> = ({ data }) => {
  const slice = data.slice(0, 8)
  return (
    <Line data={{
      labels: slice.map((item) => item.dt_txt.split(' ')[1].slice(0, 5)),
      datasets: [
        {
          data: slice.map((item) => Math.round(item.main.temp)),
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5'
        }
      ]
    }}/>
  )
}