import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TreeView } from "./components/treeView";
import { Toaster } from "sonner";

const App = () => {
  const queryClient = new QueryClient();

  // TODO - ADD SKELETON TO INDIVIDUAL FILES
  // TODO - MAKE A FOLDER/FILE ACTIVE WHEN YOU DOUBLE CLICK
  // TODO - ADD ADDRESS BAR
  // TODO - ADD UPDATE/DELETE METHODS FOR EACH DIR/FILE

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Directory Tree</h1>
        <TreeView />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
