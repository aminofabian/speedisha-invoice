import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

interface OverlappingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OverlappingInput({ 
  value, 
  onChange,
  type = "text",
  name,
  required,
  ...props 
}: OverlappingInputProps) {
  return (
    <div className="group relative">
      <label
        htmlFor="email-input"
        className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
      >
        Email address
      </label>
      <Input 
        id="email-input"
        className="h-10"
        placeholder="Enter your email address"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
}
