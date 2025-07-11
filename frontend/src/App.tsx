import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TreeView } from "./components/treeView";
import { Toaster } from "sonner";
import { DirectoryExplorer } from "./components/DirectoryExplorer";

const App = () => {
  const queryClient = new QueryClient();

  // TODO - ADD SKELETON TO INDIVIDUAL FILES
  // TODO - MAKE A FOLDER/FILE ACTIVE WHEN YOU DOUBLE CLICK - {
  // Fix - SO THAT WHEN YOU DOUBLE CLICK A DIR IT STAYS BUT HIGHLIGHT A DISTICT COLOR
  // TO REPRESENT ACTIVE DIR
  // FIX - WHEN A CHILD NODE IS ACTIVE, DISPLAY PATHS TO THE ADDRESS BAR (INSTEAD OF REMOVING IT'S INHERITED FOLDERS)
  // BUT HIGHLIGHT THE ACTIVE PATH IN THE ADDRESS AND THE FOLDER IT BELONGS
  // }
  // TODO - ADD ADDRESS BAR
  // TODO - ADD DELETE METHODS FOR EACH DIR/FILE

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Directory Tree</h1>
        <DirectoryExplorer />
        {/* <TreeView /> */}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
