import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationStack } from './src/navigation/NavigationStack';
import { useAppTheme } from './src/utils/theme/useAppTheme';

const queryClient = new QueryClient();

export default function App() {
  const { color } = useAppTheme();
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <QueryClientProvider client={queryClient}>
      <NavigationStack />
    </QueryClientProvider>
  );
}
