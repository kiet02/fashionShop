import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  BottomNavigation: undefined;
  Detail: { id: number };
  Cart: undefined;
  Payment: undefined;
  VNPay: { url: string; orderId: number };
  UserInfo: undefined;
  Address: undefined;
  OrderHistory: undefined;
  OrderDetail: { orderId: number };
  WriteReview: { productId: number; productName: string };
  Search: {
    navigate(arg0: string, params: any): unknown; category?: string; gender?: string
  };
};

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Cart: undefined;
  Search: { category?: string };
};

export type RouteStackProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type NavigationStackProps = RouteStackProps<
  keyof RootStackParamList
>['navigation'];
