import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const AddressBar = ({
  path,
  onNavigate,
}: {
  path: { id: number; name: string }[];
  onNavigate: (index: number) => void;
}) => {
  return (
    <div className="flex items-center gap-1 mb-4 text-sm text-muted-foreground">
      <Button variant="link" size="sm" onClick={() => onNavigate(-1)}>
        directory-tree
      </Button>
      {path.map((item, idx) => (
        <div key={item.id} className="flex items-center">
          <ChevronRight size={14} />
          <Button variant="link" size="sm" onClick={() => onNavigate(idx)}>
            {item.name}
          </Button>
        </div>
      ))}
    </div>
  );
};
