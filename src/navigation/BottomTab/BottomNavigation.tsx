/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../type';
import { Cart, Home, Profile } from '../../screen';
import { AppIcon, IconConfig } from '../../elements';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { useAppLanguage } from '../../utils/language/useAppLanguage';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomNavigation() {
  const { color: themeColor } = useAppTheme();
  const { language } = useAppLanguage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: themeColor.primary,
        tabBarInactiveTintColor: themeColor.textSecondary,
        headerTitle: 'Fashion Shop',
        headerTitleAlign: 'center',
        // tabBarBadge: route.name === 'Cart' ? 3 : undefined,
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
            case 'Cart':
              iconConfig = { type: 'MaterialIcons', name: 'shopping-cart' };
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
        name="Cart"
        component={Cart}
        options={{ title: language.bottomTab.cart }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: language.bottomTab.profile }}
      />
    </Tab.Navigator>
  );
}
