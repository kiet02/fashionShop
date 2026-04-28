/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screen/Login';
import { Register } from '../screen/register/register';
import { RootStackParamList } from './type';
import { BottomNavigation } from './BottomTab/BottomNavigation';
import { Detail } from '../screen/Detail';
import { AppIcon } from '../elements';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function NavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomNavigation">
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
          options={{
            headerTitle: '',
            headerRight: () => {
              return (
                <AppIcon
                  icon={{
                    type: 'MaterialIcons',
                    name: 'shopping-cart',
                    size: 24,
                    color: '#000000',
                  }}
                />
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
