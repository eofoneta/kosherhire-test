import { useState } from "react";
import { AddressBar } from "./AddressBar";
import { TreeView } from "./treeView";

interface PathProps {
  id: number;
  name: string;
}

export const DirectoryExplorer = () => {
  const [path, setPath] = useState<PathProps[]>([]);

  const handleNavigate = (index: number) => {
    if (index === -1) setPath([]);
    else setPath(path.slice(0, index + 1));
  };

  return (
    <div>
      <AddressBar path={path} onNavigate={handleNavigate} />
      <TreeView
        parentId={null}
        path={path}
        setPath={setPath}
        handleNavigate={handleNavigate}
      />
    </div>
  );
};
