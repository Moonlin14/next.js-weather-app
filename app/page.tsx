'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getWheatherData } from "./action";

const SubmitButton = () => {
  return (
    <Button type="submit">
      <Search className="w-4 h-4" />
    </Button>
  )
}

export default function Home() {
  
  const handleSearch = async (formData: FormData) => {
    const city = formData.get('city') as string;
    const data = await getWheatherData(city);
    console.log(data);
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-700 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action={handleSearch} className="flex gap-2">
          <Input 
          name="city"
          type="text"
          placeholder="Enter city name..."
          className="bg-wgite/90"
          required
          />   
          <SubmitButton />
        </form>     
      </div>
    </div>
  );
}
