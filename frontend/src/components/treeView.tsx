import { useTree } from "../hooks/useTree";
import { TreeNode } from "./TreeNode";

export const TreeView = ({ parentId }: { parentId?: number }) => {
  const { data, isLoading } = useTree(parentId);

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="ml-4">
      {data?.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};
