import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationStack } from './src/navigation/NavigationStack';
import { CartProvider } from './src/utils/cart/CartContext';
import { UserProvider } from './src/utils/user/UserContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <NavigationStack />
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
