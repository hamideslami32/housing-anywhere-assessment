import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Characters from './components/characters/Characters';
import styles from './App.module.scss';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className={styles.app}>
      <QueryClientProvider client={queryClient}>
        <Characters />
      </QueryClientProvider>
    </div>
  );
}

export default App;
