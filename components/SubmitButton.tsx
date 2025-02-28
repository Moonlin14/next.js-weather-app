import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FC } from "react";

const SubmitButton: FC = () => {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      <Search className={`h-4 w-4 ${pending ? 'animate-spin' : ''}`} />
    </Button>
  )
};

export default SubmitButton;