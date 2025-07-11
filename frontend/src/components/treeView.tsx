import { useTree } from "../hooks/useTree";
import { TreeNode } from "./TreeNode";
import { Skeleton } from "./ui/skeleton";

interface TreeViewProps {
  handleNavigate: (index: number) => void;
  parentId?: number | null;
  path: { id: number; name: string }[];
  setPath: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
}

export const TreeView = ({ parentId, path, setPath, handleNavigate }: TreeViewProps) => {
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
        <TreeNode key={node.id} node={node} path={path} setPath={setPath} handleNavigate={handleNavigate} />
      ))}
    </div>
  );
};
