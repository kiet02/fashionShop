import { AppText, AppIcon, AppImage } from '../../elements';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { SIZE } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { fetchProductReviews } from '../../utils/fetchApi';
import { KEY_API } from '../../utils/fetchApi/api';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface CommentItemProps {
  review: any;
}

const CommentItem = ({ review }: CommentItemProps) => {
  const { color } = useAppTheme();
  const user = review.user || {};

  return (
    <View style={[styles.itemContainer, { borderBottomColor: color.border }]}>
      <View style={styles.headerRow}>
        <View style={styles.userInfo}>
          <AppImage
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <View>
            <AppText style={styles.userName}>{user.name || 'Người dùng'}</AppText>
            <AppText style={[styles.date, { color: color.textSecondary }]}>
              {review.createAt ? new Date(review.createAt).toLocaleDateString('vi-VN') : 'Gần đây'}
            </AppText>
          </View>
        </View>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <AppIcon
              key={star}
              icon={{
                type: 'MaterialIcons',
                name: star <= review.rating ? 'star' : 'star-outline'
              }}
              size={16}
              color="#FFD700"
            />
          ))}
        </View>
      </View>
      <AppText style={styles.commentText}>{review.comment}</AppText>
    </View>
  );
};

export const CommentList = ({ productId }: { productId: number }) => {
  const { color } = useAppTheme();
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: [KEY_API.Reviews, productId],
    queryFn: () => fetchProductReviews(productId),
  });

  if (isLoading) return <ActivityIndicator style={{ margin: 20 }} />;

  // Tính toán phân trang
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <AppText style={styles.title}>Đánh giá sản phẩm</AppText>
        <AppText style={{ color: color.base }}>({reviews.length})</AppText>
      </View>

      {reviews.length === 0 ? (
        <AppText style={styles.emptyText}>Chưa có đánh giá nào cho sản phẩm này.</AppText>
      ) : (
        <>
          {currentReviews.map((item: any, index: number) => (
            <CommentItem key={index} review={item} />
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <View style={styles.pagination}>
              <TouchableOpacity
                disabled={page === 1}
                onPress={goToPrevPage}
                style={[styles.pageBtn, page === 1 && { opacity: 0.3 }]}
              >
                <AppIcon icon={{ type: 'MaterialIcons', name: 'chevron-left' }} size={24} color={color.text} />
              </TouchableOpacity>

              <AppText style={styles.pageInfo}>
                Trang <AppText style={{ fontWeight: 'bold' }}>{page}</AppText> / {totalPages}
              </AppText>

              <TouchableOpacity
                disabled={page === totalPages}
                onPress={goToNextPage}
                style={[styles.pageBtn, page === totalPages && { opacity: 0.3 }]}
              >
                <AppIcon icon={{ type: 'MaterialIcons', name: 'chevron-right' }} size={24} color={color.text} />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZE.PAD_M,
    marginTop: SIZE.MAR_S,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SIZE.MAR_M,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingVertical: SIZE.PAD_M,
    borderBottomWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  userName: {
    fontWeight: '600',
    fontSize: 14,
  },
  date: {
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 20,
    opacity: 0.6,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZE.MAR_M,
    gap: 16,
  },
  pageBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  pageInfo: {
    fontSize: 14,
  }
});
