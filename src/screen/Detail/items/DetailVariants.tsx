import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductItem } from '../../../utils/fetchApi/type';
import { AppText } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';

interface Props {
  items: ProductItem[];
  onVariantChange: (item: ProductItem | undefined) => void;
}

export function DetailVariants({ items, onVariantChange }: Props) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { color } = useAppTheme();
  
  const colors = useMemo(() => Array.from(new Set(items.map(i => i.color).filter(Boolean))), [items]);
  const sizes = useMemo(() => Array.from(new Set(items.map(i => i.size).filter(Boolean))), [items]);

  useEffect(() => {
    if (colors.length > 0 && !selectedColor) setSelectedColor(colors[0]);
    if (sizes.length > 0 && !selectedSize) setSelectedSize(sizes[0]);
  }, [colors, sizes, selectedColor, selectedSize]);

  // Find the exact item combination to display stock
  const matchedItem = useMemo(() => {
    const item = items.find(
      i => (colors.length === 0 || i.color === selectedColor) &&
        (sizes.length === 0 || i.size === selectedSize)
    );
    return item;
  }, [items, selectedColor, selectedSize, colors, sizes]);

  useEffect(() => {
    onVariantChange(matchedItem);
  }, [matchedItem, onVariantChange]);

  if (colors.length === 0 && sizes.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: color.card }]}>
      {colors.length > 0 && (
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <AppText style={[styles.title, { color: color.text }]}>Màu sắc</AppText>
            {!!selectedColor && <AppText style={[styles.selectedValue, { color: color.textSecondary }]}>{selectedColor}</AppText>}
          </View>
          <View style={styles.optionsRow}>
            {colors.map(c => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.colorCircleBtn,
                  { borderColor: selectedColor === c ? color.base : color.border },
                ]}
                onPress={() => setSelectedColor(c)}
              >
                <View style={[styles.colorCircle, { backgroundColor: c.toLowerCase() }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {colors.length > 0 && sizes.length > 0 && <View style={[styles.divider, { backgroundColor: color.border }]} />}

      {sizes.length > 0 && (
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <AppText style={[styles.title, { color: color.text }]}>Kích thước</AppText>
            {!!selectedSize && <AppText style={[styles.selectedValue, { color: color.textSecondary }]}>{selectedSize}</AppText>}
          </View>
          <View style={styles.optionsRow}>
            {sizes.map(size => {
              // Check if size is available for the selected color
              const isAvailable = items.some(
                i => i.size === size && (colors.length === 0 || i.color === selectedColor) && i.quantity > 0
              );

              return (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.optionBtn,
                    {
                      borderColor: selectedSize === size ? color.base : color.border,
                      backgroundColor: selectedSize === size ? color.base + '10' : color.card
                    },
                    !isAvailable && { opacity: 0.4 }
                  ]}
                  onPress={() => setSelectedSize(size)}
                  disabled={!isAvailable}
                >
                  <AppText style={[
                    styles.optionText,
                    { color: selectedSize === size ? color.base : color.text },
                    !isAvailable && { color: color.textSecondary }
                  ]}>
                    {size}
                  </AppText>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      )}

      {matchedItem && (
        <View style={[styles.stockRow, { borderTopColor: color.border }]}>
          <AppText style={[styles.stockText, { color: color.textSecondary }]}>
            Kho <AppText style={[styles.stockValue, { color: color.text }]}>{matchedItem.quantity}</AppText>
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 16,
  },
  section: {
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  optionBtnSelected: {
    borderColor: '#EE4D2D',
    backgroundColor: '#FFF0ED',
  },
  optionBtnDisabled: {
  },
  optionText: {
    fontSize: 13,
  },
  optionTextSelected: {
    fontWeight: '500',
  },
  optionTextDisabled: {
  },
  colorCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  colorCircleBtnSelected: {
  },
  colorCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: -2,
  },
  stockRow: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  stockText: {
    fontSize: 13,
    color: '#757575',
  },
  stockValue: {
    fontWeight: '500',
  },
});
