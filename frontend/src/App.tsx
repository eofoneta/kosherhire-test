import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { TreeView } from "./components/treeView";
import { Toaster } from "sonner";
import { DirectoryExplorer } from "./components/DirectoryExplorer";

const App = () => {
  const queryClient = new QueryClient();

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
