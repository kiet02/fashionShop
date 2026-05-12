import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { useUser } from '../../utils/user/UserContext';
import { ProfileHeader } from './items/ProfileHeader';
import { ProfileMenu } from './items/ProfileMenu';
import { useQuery } from '@tanstack/react-query';
import { KEY_API } from '../../utils/fetchApi/api';
import { fetchOrdersByUserId, fetchUserFullInfo } from '../../utils/fetchApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

export function Profile() {
  const { color } = useAppTheme();
  const { user, setUser } = useUser();

  const { data: fullUser, refetch: refetchUser, isFetching: isFetchingUser } = useQuery({
    queryKey: ['user-full', user?.id],
    queryFn: () => fetchUserFullInfo(user?.id!),
    enabled: !!user?.id,
  });
  console.log('fullUser', user?.address);
  const { data: orders, isLoading: isLoadingOrders, refetch: refetchOrders } = useQuery({
    queryKey: [KEY_API.Orders, user?.id],
    queryFn: () => fetchOrdersByUserId(user?.id!),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (fullUser && user) {
      // Sync local context with backend data
      const updatedUser = { ...user, ...fullUser };
      // Check if actually different to avoid loops
      if (JSON.stringify(updatedUser) !== JSON.stringify(user)) {
        setUser(updatedUser);
      }
    }
  }, [fullUser, setUser, user]);

  const handleRefresh = () => {
    refetchUser();
    refetchOrders();
  };

  const isRefreshing = isFetchingUser || isLoadingOrders;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={[styles.container, { backgroundColor: color.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[color.base]}
            tintColor={color.base}
          />
        }
      >
        <ProfileHeader user={user} />
        <ProfileMenu orders={orders || []} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
});
