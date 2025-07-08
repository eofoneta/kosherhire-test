import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TreeView } from './components/treeView'

const App = () => {
  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Directory Tree</h1>
        <TreeView />
      </div>
    </QueryClientProvider>
  )
}

export default App