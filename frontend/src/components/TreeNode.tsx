import { useRef, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteNode, type Node } from "@/hooks/useTree";
import { TreeView } from "./treeView";
import { AddNodeDialog } from "./AddNodeDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { truncate } from "@/util/util";

interface TreeNodeProps {
  node: Node;
  path: { id: number; name: string }[];
  setPath: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
  handleNavigate: (index: number) => void;
  showCreateModal: boolean;
  setShowCreateModal: (value: boolean) => void;
}

export const TreeNode = ({
  node,
  path,
  setPath,
  handleNavigate,
  showCreateModal,
  setShowCreateModal,
}: TreeNodeProps) => {
  const [expanded, setExpanded] = useState(false);
  const { mutate: deleteNode } = useDeleteNode();

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
            <span
              title={node.name}
              className={`ml-1 ${isActive ? "font-semibold" : ""}`}
            >
              {truncate(12, node.name)}
            </span>
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow p-1 rounded text-sm space-y-2">
                {node.isDir && (
                  <DropdownMenuItem
                    className="hover:bg-zinc-300 transition p-1 rounded"
                    onClick={() => setShowCreateModal(true)}
                  >
                    + New
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    if (confirm(`Delete "${node.name}"?`)) {
                      deleteNode(node.id);
                      console.log("Deleted node id:", node.id);
                    }
                  }}
                  className="text-red-500 hover:bg-zinc-300 transition p-1 rounded"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

      <AddNodeDialog
        parentId={node.id}
        open={showCreateModal}
        setOpen={setShowCreateModal}
      />
    </div>
  );
};
