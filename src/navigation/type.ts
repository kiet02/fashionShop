import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  BottomNavigation: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Cart: undefined;
};

export type RouteStackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type NavigationStackProps = RouteStackProps<
  keyof RootStackParamList
>['navigation'];
