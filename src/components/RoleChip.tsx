import { cn } from "@/lib/utils";

interface RoleChipProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const RoleChip = ({ children, onClick, className }: RoleChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-full border border-border bg-card/30 backdrop-blur-sm",
        "hover:bg-primary/10 hover:border-primary/30 hover:text-electric-green transition-all duration-200",
        "cursor-pointer text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  );
};