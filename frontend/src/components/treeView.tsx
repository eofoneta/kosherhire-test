import { useTree } from "../hooks/useTree";
import { TreeNode } from "./TreeNode";
import { Skeleton } from "./ui/skeleton";

export const TreeView = ({
  parentId,
  onDrillDown,
}: {
  parentId?: number;
  onDrillDown?: (item: { id: number; name: string }) => void;
}) => {
  const { data, isLoading } = useTree(parentId);

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
    <div className="ml-4 max-w-[200px]">
      {data?.map((node) => (
        <TreeNode key={node.id} node={node} onDrillDown={onDrillDown} />
      ))}
    </div>
  );
};
