import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Characters from './components/Characters';
import './App.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Characters />
      </QueryClientProvider>
    </div>
  );
}

export default App;
