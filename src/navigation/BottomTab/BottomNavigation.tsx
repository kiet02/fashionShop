/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, NavigationStackProps, } from '../type';
import { Home, Profile } from '../../screen';
import { AppIcon, IconConfig } from '../../elements';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { useAppLanguage } from '../../utils/language/useAppLanguage';
import { Search } from '../../screen/Search/Search';
import { useNavigation } from '@react-navigation/native';

import { useCart } from '../../utils/cart/CartContext';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomNavigation() {
  const { color: themeColor } = useAppTheme();
  const { language } = useAppLanguage();
  const { totalItems } = useCart();
  const navigation = useNavigation<NavigationStackProps>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: themeColor.primary,
        tabBarInactiveTintColor: themeColor.textSecondary,
        headerTitle: 'Fashion Shop',
        headerTitleAlign: 'center',
        headerShown: route.name === 'Home' ? true : false,
        headerRight: () => {
          return (
            <AppIcon
              icon={{ type: 'MaterialIcons', name: 'shopping-cart' }}
              color={themeColor.text}
              size={24}
              containerStyle={{
                marginRight: 10,
              }}
              badge={totalItems}
              onPress={() => navigation.navigate('Cart')}
            />
          );
        },
        headerTitleStyle: {
          color: themeColor.text,
          fontSize: 24,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: themeColor.background,
          borderTopColor: themeColor.border,
        },
        tabBarIcon: ({ color, size }) => {
          let iconConfig: IconConfig;
          switch (route.name) {
            case 'Home':
              iconConfig = { type: 'MaterialIcons', name: 'home' };
              break;
            case 'Search':
              iconConfig = { type: 'MaterialIcons', name: 'search' };
              break;
            case 'Profile':
              iconConfig = { type: 'MaterialIcons', name: 'person' };
              break;
            default:
              iconConfig = { type: 'MaterialIcons', name: 'help' };
          }

          return <AppIcon icon={iconConfig} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: language.bottomTab.home }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ title: language.bottomTab.Search }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: language.bottomTab.profile }}
      />
    </Tab.Navigator>
  );
}
