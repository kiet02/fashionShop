import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppIcon } from '../../elements';
import { useAppTheme } from '../../utils/theme/useAppTheme';
import { SIZE } from '../../utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCreateReview, fetchUserReview } from '../../utils/fetchApi';
import { KEY_API } from '../../utils/fetchApi/api';
import { useUser } from '../../utils/user/UserContext';

export function WriteReview() {
  const { color } = useAppTheme();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { productId, productName } = route.params;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Kiểm tra xem user đã đánh giá sản phẩm này chưa
  const { data: existingReview, isLoading: isLoadingReview } = useQuery({
    queryKey: ['user-review', productId, user?.id],
    queryFn: () => fetchUserReview(productId, user?.id as number),
    enabled: !!user?.id,
  });

  const isEditing = !!existingReview;

  // Pre-fill dữ liệu nếu đã có đánh giá
  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment || '');
    }
  }, [existingReview]);

  const mutation = useMutation({
    mutationFn: () =>
      fetchCreateReview({
        productId,
        rating,
        comment,
        image: null,
        user: { id: user?.id as number },
      }),
    onSuccess: () => {
      // Invalidate để danh sách review tự refresh
      queryClient.invalidateQueries({ queryKey: [KEY_API.Reviews, productId] });
      queryClient.invalidateQueries({ queryKey: ['user-review', productId, user?.id] });
      Alert.alert(
        'Thành công',
        isEditing ? 'Đánh giá đã được cập nhật!' : 'Đánh giá của bạn đã được gửi!',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    },
    onError: (err: any) => {
      console.error('Review error:', err);
      Alert.alert('Lỗi', 'Không thể gửi đánh giá. Vui lòng thử lại.');
    },
  });

  const handleSubmit = () => {
    if (!comment.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung đánh giá.');
      return;
    }
    mutation.mutate();
  };

  if (isLoadingReview) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: color.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'arrow-back' }} size={24} color={color.text} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Đánh giá</AppText>
          <View style={{ width: 24 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={color.base} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'arrow-back' }} size={24} color={color.text} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>
          {isEditing ? 'Sửa đánh giá' : 'Viết đánh giá'}
        </AppText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: color.card }]}>
          <AppText style={styles.productName} numberOfLines={2}>{productName}</AppText>

          {/* Rating Stars */}
          <View style={styles.ratingSection}>
            <AppText style={[styles.ratingLabel, { color: color.textSecondary }]}>Chất lượng sản phẩm</AppText>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <AppIcon
                    icon={{
                      type: 'MaterialIcons',
                      name: star <= rating ? 'star' : 'star-outline',
                    }}
                    size={36}
                    color={star <= rating ? '#FFD700' : '#ccc'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <AppText style={[styles.ratingText, { color: color.base }]}>
              {rating === 1 && 'Tệ'}
              {rating === 2 && 'Không hài lòng'}
              {rating === 3 && 'Bình thường'}
              {rating === 4 && 'Hài lòng'}
              {rating === 5 && 'Tuyệt vời'}
            </AppText>
          </View>

          {/* Comment Input */}
          <View style={styles.commentSection}>
            <AppText style={[styles.commentLabel, { color: color.textSecondary }]}>Nhận xét của bạn</AppText>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: color.background,
                  color: color.text,
                  borderColor: color.border,
                },
              ]}
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
              placeholderTextColor={color.textSecondary}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={comment}
              onChangeText={setComment}
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: color.base, opacity: mutation.isPending ? 0.6 : 1 }]}
          onPress={handleSubmit}
          disabled={mutation.isPending}
        >
          <AppText style={styles.submitText}>
            {mutation.isPending
              ? 'Đang gửi...'
              : isEditing
                ? 'Cập nhật đánh giá'
                : 'Gửi đánh giá'}
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZE.PAD_M,
    height: 56,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: SIZE.PAD_M,
  },
  card: {
    borderRadius: 16,
    padding: SIZE.PAD_M,
    marginBottom: SIZE.MAR_M,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SIZE.MAR_M,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: SIZE.MAR_M,
    paddingBottom: SIZE.PAD_M,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  ratingLabel: {
    fontSize: 14,
    marginBottom: 10,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  commentSection: {
    marginTop: SIZE.MAR_S,
  },
  commentLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
    fontSize: 14,
    lineHeight: 20,
  },
  submitBtn: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
