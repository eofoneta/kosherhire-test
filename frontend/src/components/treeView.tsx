import { useState } from "react";
import { useTree } from "../hooks/useTree";
import { TreeNode } from "./TreeNode";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { AddNodeDialog } from "./AddNodeDialog";

interface TreeViewProps {
  handleNavigate: (index: number) => void;
  parentId?: number | null;
  path: { id: number; name: string }[];
  setPath: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
}

export const TreeView = ({
  parentId,
  path,
  setPath,
  handleNavigate,
}: TreeViewProps) => {
  const { data, isLoading } = useTree(parentId);
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-1 ml-4 max-w-[200px]">
        {[1, 2, 3].map((_, i) => (
          <Skeleton key={i} className="h-4 w-10 rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="ml-4 max-w-[250px]">
      {parentId == null && (
        <Button variant={"ghost"} onClick={() => setShowCreateModal(true)}>
          + New
        </Button>
      )}

      {data?.map((node) => (
        <TreeNode
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          key={node.id}
          node={node}
          path={path}
          setPath={setPath}
          handleNavigate={handleNavigate}
        />
      ))}

      {showCreateModal && (
        <AddNodeDialog
          parentId={parentId ?? undefined}
          open={showCreateModal}
          setOpen={setShowCreateModal}
        />
      )}
    </div>
  );
};
