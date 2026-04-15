import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationStack } from './src/navigation/NavigationStack';
import { SafeAreaView } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationStack />
      </QueryClientProvider>
    </SafeAreaView>
  );
}
