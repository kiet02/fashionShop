import React, { useRef, useState } from 'react';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ProductInventoryItem } from '../../../utils/fetchApi/type';
import { AppImage } from '../../../elements';
import { SIZE } from '../../../utils';

// Đặt ngoài component để tránh re-create mỗi render
const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 50 };

const THUMB_SIZE = 64;
const THUMB_MARGIN = 8;
const THUMB_BORDER = 2;

export function DetailImage({ data }: { data: ProductInventoryItem[] }) {
  const { width } = useWindowDimensions();
  const mainListRef = useRef<FlashListRef<ProductInventoryItem>>(null);
  const thumbListRef = useRef<FlashListRef<ProductInventoryItem>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onThumbPress = (index: number) => {
    setActiveIndex(index);
    mainListRef.current?.scrollToIndex({ index, animated: true });
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index ?? 0;
      setActiveIndex(index);
      thumbListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }).current;

  return (
    <View style={styles.container}>
      {/* MAIN IMAGE LIST */}
      <View style={{ height: SIZE.HEIGHT_DP(45), width }}>
        <FlashList
          ref={mainListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={VIEWABILITY_CONFIG}
          keyExtractor={(item, index) => `main-${item.id}-${index}`}
          renderItem={({ item }) => (
            <View style={{ width, height: SIZE.HEIGHT_DP(45) }}>
              <AppImage
                source={{
                  uri: 'https://nads.1cdn.vn/2024/11/22/74da3f39-759b-4f08-8850-4c8f2937e81a-1_mangeshdes.png',
                }}
                style={styles.mainImage}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>

      {/* DOT INDICATOR */}
      {data.length > 1 && (
        <View style={styles.dotContainer}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      )}

      {/* THUMBNAIL LIST */}
      <View style={styles.thumbWrapper}>
        <FlashList
          ref={thumbListRef}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbContent}
          keyExtractor={(item, index) => `thumb-${item.id}-${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onThumbPress(index)}
              activeOpacity={0.8}
              style={[
                styles.thumbItem,
                index === activeIndex && styles.thumbItemActive,
              ]}
            >
              <AppImage
                source={{
                  uri: 'https://nads.1cdn.vn/2024/11/22/74da3f39-759b-4f08-8850-4c8f2937e81a-1_mangeshdes.png',
                }}
                style={styles.thumbImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0, // Tuỳ design, bỏ radius nếu full-width
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: '#EE4D2D',
    width: 18, // Dot active dài hơn để dễ nhận biết
  },
  dotInactive: {
    backgroundColor: '#D9D9D9',
  },
  thumbWrapper: {
    height: THUMB_SIZE + THUMB_MARGIN * 2,
    marginTop: 10,
  },
  thumbContent: {
    paddingHorizontal: 12,
  },
  thumbItem: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    marginRight: THUMB_MARGIN,
    borderRadius: 6,
    borderWidth: THUMB_BORDER,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbItemActive: {
    borderColor: '#EE4D2D',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
});
