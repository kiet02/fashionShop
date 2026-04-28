import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductItem } from '../../../utils/fetchApi/type';
import { AppText } from '../../../elements';

interface Props {
  items: ProductItem[];
}

export function DetailVariants({ items }: Props) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const colors = useMemo(() => Array.from(new Set(items.map(i => i.color).filter(Boolean))), [items]);
  const sizes = useMemo(() => Array.from(new Set(items.map(i => i.size).filter(Boolean))), [items]);

  useEffect(() => {
    if (colors.length > 0 && !selectedColor) setSelectedColor(colors[0]);
    if (sizes.length > 0 && !selectedSize) setSelectedSize(sizes[0]);
  }, [colors, sizes, selectedColor, selectedSize]);

  // Find the exact item combination to display stock
  const matchedItem = useMemo(() => {
    return items.find(
      i => (colors.length === 0 || i.color === selectedColor) && 
           (sizes.length === 0 || i.size === selectedSize)
    );
  }, [items, selectedColor, selectedSize, colors, sizes]);

  if (colors.length === 0 && sizes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {colors.length > 0 && (
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <AppText style={styles.title}>Màu sắc</AppText>
            {!!selectedColor && <AppText style={styles.selectedValue}>{selectedColor}</AppText>}
          </View>
          <View style={styles.optionsRow}>
            {colors.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorCircleBtn,
                  selectedColor === color && styles.colorCircleBtnSelected,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                <View style={[styles.colorCircle, { backgroundColor: color.toLowerCase() }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {colors.length > 0 && sizes.length > 0 && <View style={styles.divider} />}

      {sizes.length > 0 && (
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <AppText style={styles.title}>Kích thước</AppText>
            {!!selectedSize && <AppText style={styles.selectedValue}>{selectedSize}</AppText>}
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
                    selectedSize === size && styles.optionBtnSelected,
                    !isAvailable && styles.optionBtnDisabled
                  ]}
                  onPress={() => setSelectedSize(size)}
                  disabled={!isAvailable}
                >
                  <AppText style={[
                    styles.optionText, 
                    selectedSize === size && styles.optionTextSelected,
                    !isAvailable && styles.optionTextDisabled
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
        <View style={styles.stockRow}>
          <AppText style={styles.stockText}>
            Kho <AppText style={styles.stockValue}>{matchedItem.quantity}</AppText>
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
    backgroundColor: '#fff',
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
    color: '#1A1A1A',
  },
  selectedValue: {
    fontSize: 13,
    color: '#757575',
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
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  optionBtnSelected: {
    borderColor: '#EE4D2D',
    backgroundColor: '#FFF0ED',
  },
  optionBtnDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#EEEEEE',
  },
  optionText: {
    fontSize: 13,
    color: '#1A1A1A',
  },
  optionTextSelected: {
    color: '#EE4D2D',
    fontWeight: '500',
  },
  optionTextDisabled: {
    color: '#BDBDBD',
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
    borderColor: '#EE4D2D',
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
    color: '#1A1A1A',
    fontWeight: '500',
  },
});
