import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAddNode } from "@/hooks/useTree";
import { toast } from "sonner";

export const AddNodeDialog = ({
  parentId,
  open,
  setOpen,
}: {
  parentId?: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [isDir, setIsDir] = useState(true);
  const addNode = useAddNode();

  const handleSubmit = () => {
    if (!name.trim()) return;

    addNode.mutate(
      { name, isDir, parentId },
      {
        onSuccess: () => {
          toast("Success", {
            description: `${isDir ? "Folder" : "File"} created`,
          });
          setName("");
          setOpen(false);
        },
        onError: () => {
          toast("Error", {
            description: "Failed to create node",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Folder/File</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <div className="flex gap-2">
          <Button
            variant={isDir ? "default" : "outline"}
            onClick={() => setIsDir(true)}
          >
            Folder
          </Button>
          <Button
            variant={!isDir ? "default" : "outline"}
            onClick={() => setIsDir(false)}
          >
            File
          </Button>
        </div>
        <Button className="mt-2 w-full" onClick={handleSubmit}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};
