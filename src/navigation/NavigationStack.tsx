/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Cart, PaymentWebView } from '../screen';
import { Register } from '../screen/register/register';
import { RootStackParamList } from './type';
import { BottomNavigation } from './BottomTab/BottomNavigation';
import { Detail } from '../screen/Detail';
import { AppIcon } from '../elements';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Detail"
          component={Detail}
        />
        
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerTitle: 'Giỏ hàng',
            headerStyle: { backgroundColor: '#002D5E' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="PaymentWebView"
          component={PaymentWebView}
          options={{
            headerTitle: 'Thanh toán VNPay',
            headerStyle: { backgroundColor: '#002D5E' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
