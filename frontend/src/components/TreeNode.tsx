import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Node } from "@/hooks/useTree";
import { TreeView } from "./treeView";
import { AddNodeDialog } from "./AddNodeDialog";

export const TreeNode = ({ node }: { node: Node }) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((prev) => !prev);

  return (
    <div className="my-1">
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
            <span className="ml-1">{node.name}</span>
          </div>
          {node.isDir && (
            <AddNodeDialog parentId={node.parentId ?? undefined} />
          )}
        </div>
      </div>

      {node.isDir && expanded && <TreeView parentId={node.id} />}

      <div className="ml-auto">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </div>
  );
};
