import { useState } from "react";
import { AddressBar } from "./AddressBar";
import { TreeView } from "./treeView";

export const DirectoryExplorer = () => {
  const [path, setPath] = useState<{ id: number; name: string }[]>([]);

  const currentParentId = path.at(-1)?.id;

  const handleNavigate = (index: number) => {
    if (index === -1) setPath([]);
    else setPath(path.slice(0, index + 1));
  };

  const handleDrillDown = (item: { id: number; name: string }) => {
    setPath([...path, item]);
  };

  return (
    <div>
      <AddressBar path={path} onNavigate={handleNavigate} />
      <TreeView parentId={currentParentId} onDrillDown={handleDrillDown} />
    </div>
  );
};
