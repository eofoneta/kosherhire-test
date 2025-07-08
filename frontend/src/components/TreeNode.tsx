import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Node } from "@/hooks/useTree";
import { TreeView } from "./treeView";

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
        {node.isDir ? <Folder size={16} /> : <File size={16} />}
        <span className="ml-1">{node.name}</span>
      </div>

      {node.isDir && expanded && <TreeView parentId={node.id} />}
    </div>
  );
};
