import { useRef, useState } from "react";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Node } from "@/hooks/useTree";
import { TreeView } from "./treeView";
import { AddNodeDialog } from "./AddNodeDialog";
import { Skeleton } from "./ui/skeleton";

interface TreeNodeProps {
  node: Node;
  path: { id: number; name: string }[];
  setPath: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  handleNavigate: (index: number) => void;
}

export const TreeNode = ({
  node,
  path,
  setPath,
  handleNavigate,
}: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((prev) => !prev);

  const isActive = path.some((p) => p.id === node.id);

  const triggerNavigateOnNextClick = useRef(false);

  const onDoubleClick = async () => {
    if (triggerNavigateOnNextClick.current) {
      await handleNavigate(-1);
      triggerNavigateOnNextClick.current = false;
    }

    if (node.isDir) {
      setPath((prev) => {
        const existingIndex = prev.findIndex((p) => p.id === node.id);
        if (existingIndex !== -1) {
          return prev.slice(0, existingIndex + 1);
        }
        return [...prev, { id: node.id, name: node.name }];
      });
    }

    triggerNavigateOnNextClick.current = true;
  };

  return (
    <div className="my-1 cursor-pointer" onDoubleClick={onDoubleClick}>
      <div className="flex items-center gap-1">
        {node.isDir ? (
          <Button variant="ghost" size="sm" onClick={toggle} className="p-1">
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Button>
        ) : (
          <div className="w-[28px]"></div>
        )}

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            {node.isDir ? <Folder size={16} /> : <File size={16} />}
            <span className={`ml-1 ${isActive ? "font-semibold" : ""}`}>
              {node.name}
            </span>
          </div>
          {node.isDir && <AddNodeDialog parentId={node.id} />}
        </div>
      </div>

      {node.isDir && expanded && (
        <TreeView
          parentId={node.id}
          path={path}
          setPath={setPath}
          handleNavigate={handleNavigate}
        />
      )}
    </div>
  );
};
