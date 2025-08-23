import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeroToggleProps {
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const HeroToggle = ({ options, defaultValue, onChange }: HeroToggleProps) => {
  const [selected, setSelected] = useState(defaultValue || options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onChange?.(option);
  };

  return (
    <div className="inline-flex items-center bg-card/50 backdrop-blur-sm border border-border rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
            selected === option
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};