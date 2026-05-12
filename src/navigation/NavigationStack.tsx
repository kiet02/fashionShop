/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screen/Login';
import { Register } from '../screen/register/register';
import { RootStackParamList } from './type';
import { BottomNavigation } from './BottomTab/BottomNavigation';
import { Detail } from '../screen/Detail';
import { Cart, VNPayWebView } from '../screen';
import { Payment } from '../screen';
import { UserInfo } from '../screen/Profile/screens/UserInfo';
import { Address } from '../screen/Profile/screens/Address';
import { OrderHistory } from '../screen/Profile/screens/OrderHistory';
import { OrderDetail } from '../screen/Profile/screens/OrderDetail';
import { WriteReview } from '../screen/comment/WriteReview';

import { useUser } from '../utils/user/UserContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function NavigationStack() {
  const { user } = useUser();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Group>
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerShown: true, headerTitle: '' }} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="VNPay" component={VNPayWebView} options={{ headerShown: true, headerTitle: 'Thanh toán VNPay' }} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="OrderDetail" component={OrderDetail} />
            <Stack.Screen name="WriteReview" component={WriteReview} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
