/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../type';
import { Home, Profile } from '../../screen';
import { AppIcon, AppText, IconConfig } from '../../elements';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { useAppLanguage } from '../../utils/language/useAppLanguage';
import { Search } from '../../screen/Search/Search';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomNavigation() {
  const { color: themeColor } = useAppTheme();
  const { language } = useAppLanguage();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: themeColor.primary,
        tabBarInactiveTintColor: themeColor.textSecondary,
        headerShown: route.name === 'Home' ? true : false,
        headerStyle: {
          backgroundColor: themeColor.primary,
        },
        headerTitle: '',
        headerLeft: () => (
          <AppText
            style={{
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft: 16,
            }}
          >
            Hoàng Hà PC
          </AppText>
        ),
        headerRight: () => (
          <AppIcon
            icon={{ type: 'MaterialIcons', name: 'shopping-cart' }}
            color="#FFFFFF"
            size={24}
            containerStyle={{ marginRight: 16 }}
            onPress={() => {}}
          />
        ),
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
