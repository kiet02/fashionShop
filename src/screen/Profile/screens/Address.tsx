import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppIcon } from '../../../elements';
import { useAppTheme } from '../../../utils/theme/useAppTheme';
import { useUser } from '../../../utils/user/UserContext';
import { SIZE } from '../../../utils/responsive/size';
import { fetchUpdateAddress } from '../../../utils/fetchApi';
import { useNavigation } from '@react-navigation/native';
import addressData from '../../../utils/assets/data.json';

type SelectionType = 'province' | 'district' | 'ward';

export function Address() {
  const { color } = useAppTheme();
  const { user, setUser } = useUser();
  const navigation = useNavigation();

  const [province, setProvince] = useState<any>(null);
  const [district, setDistrict] = useState<any>(null);
  const [ward, setWard] = useState<any>(null);
  const [street, setStreet] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal selection state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionType, setSelectionType] = useState<SelectionType>('province');
  const [searchText, setSearchText] = useState('');

  // Initial parse of user address if it exists
  useEffect(() => {
    if (user?.address) {
      const { city, district: dist, ward: wrd, street: str } = user.address;

      if (str) setStreet(str);

      if (city) {
        const foundProvince = addressData.find(p => p.Name === city);
        if (foundProvince) {
          setProvince(foundProvince);

          if (dist) {
            const foundDistrict = foundProvince.Districts.find(d => d.Name === dist);
            if (foundDistrict) {
              setDistrict(foundDistrict);

              if (wrd) {
                const foundWard = foundDistrict.Wards.find(w => w.Name === wrd);
                if (foundWard) {
                  setWard(foundWard);
                }
              }
            }
          }
        }
      }
    }
  }, [user]);

  const filteredData = useMemo(() => {
    let data: any[] = [];
    if (selectionType === 'province') {
      data = addressData;
    } else if (selectionType === 'district' && province) {
      data = province.Districts;
    } else if (selectionType === 'ward' && district) {
      data = district.Wards;
    }

    if (searchText) {
      return data.filter(item =>
        item.Name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return data;
  }, [selectionType, province, district, searchText]);

  const handleSelect = (item: any) => {
    if (selectionType === 'province') {
      setProvince(item);
      setDistrict(null);
      setWard(null);
    } else if (selectionType === 'district') {
      setDistrict(item);
      setWard(null);
    } else if (selectionType === 'ward') {
      setWard(item);
    }
    setModalVisible(false);
    setSearchText('');
  };

  const openPicker = (type: SelectionType) => {
    if (type === 'district' && !province) {
      Alert.alert('Thông báo', 'Vui lòng chọn Tỉnh/Thành phố trước');
      return;
    }
    if (type === 'ward' && !district) {
      Alert.alert('Thông báo', 'Vui lòng chọn Quận/Huyện trước');
      return;
    }
    setSelectionType(type);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!user) return;
    if (!province || !district || !ward || !street.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }

    setLoading(true);
    try {
      const addressPayload = {
        id: user.address?.id, // Preserve ID if updating
        city: province.Name,
        district: district.Name,
        ward: ward.Name,
        street: street.trim(),
      };
      const result = await fetchUpdateAddress(user.id, addressPayload);

      // Update local user state with the new address object
      setUser({ ...user, address: result });

      Alert.alert('Thành công', 'Cập nhật địa chỉ thành công');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Cập nhật địa chỉ thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: color.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon icon={{ type: 'MaterialIcons', name: 'arrow-back' }} size={24} color={color.text} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Địa chỉ giao hàng</AppText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Province Picker */}
        <TouchableOpacity style={styles.inputGroup} onPress={() => openPicker('province')}>
          <AppText style={[styles.label, { color: color.textSecondary }]}>Tỉnh/Thành phố</AppText>
          <View style={[styles.pickerField, { borderColor: color.border }]}>
            <AppText style={{ color: province ? color.text : color.textSecondary }}>
              {province ? province.Name : 'Chọn Tỉnh/Thành phố'}
            </AppText>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'keyboard-arrow-down' }} size={24} color={color.textSecondary} />
          </View>
        </TouchableOpacity>

        {/* District Picker */}
        <TouchableOpacity style={styles.inputGroup} onPress={() => openPicker('district')}>
          <AppText style={[styles.label, { color: color.textSecondary }]}>Quận/Huyện</AppText>
          <View style={[styles.pickerField, { borderColor: color.border, opacity: province ? 1 : 0.6 }]}>
            <AppText style={{ color: district ? color.text : color.textSecondary }}>
              {district ? district.Name : 'Chọn Quận/Huyện'}
            </AppText>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'keyboard-arrow-down' }} size={24} color={color.textSecondary} />
          </View>
        </TouchableOpacity>

        {/* Ward Picker */}
        <TouchableOpacity style={styles.inputGroup} onPress={() => openPicker('ward')}>
          <AppText style={[styles.label, { color: color.textSecondary }]}>Phường/Xã</AppText>
          <View style={[styles.pickerField, { borderColor: color.border, opacity: district ? 1 : 0.6 }]}>
            <AppText style={{ color: ward ? color.text : color.textSecondary }}>
              {ward ? ward.Name : 'Chọn Phường/Xã'}
            </AppText>
            <AppIcon icon={{ type: 'MaterialIcons', name: 'keyboard-arrow-down' }} size={24} color={color.textSecondary} />
          </View>
        </TouchableOpacity>

        {/* Street Input */}
        <View style={styles.inputGroup}>
          <AppText style={[styles.label, { color: color.textSecondary }]}>Địa chỉ chi tiết (Số nhà, tên đường)</AppText>
          <TextInput
            style={[styles.input, { color: color.text, borderColor: color.border }]}
            value={street}
            onChangeText={setStreet}
            placeholder="Số nhà, tên đường..."
            placeholderTextColor={color.textSecondary}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: color.base }]}
          onPress={handleSave}
          disabled={loading}
        >
          <AppText style={styles.saveButtonText}>{loading ? 'Đang lưu...' : 'Lưu địa chỉ'}</AppText>
        </TouchableOpacity>
      </ScrollView>

      {/* Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: color.background }]}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>
                {selectionType === 'province' ? 'Chọn Tỉnh/Thành phố' :
                  selectionType === 'district' ? 'Chọn Quận/Huyện' : 'Chọn Phường/Xã'}
              </AppText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AppIcon icon={{ type: 'MaterialIcons', name: 'close' }} size={24} color={color.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.searchBox, { backgroundColor: color.card }]}>
              <AppIcon icon={{ type: 'MaterialIcons', name: 'search' }} size={20} color={color.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: color.text }]}
                placeholder="Tìm kiếm..."
                placeholderTextColor={color.textSecondary}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.Id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.itemRow, { borderBottomColor: color.border }]}
                  onPress={() => handleSelect(item)}
                >
                  <AppText style={[styles.itemText, { color: color.text }]}>{item.Name}</AppText>
                  {((selectionType === 'province' && province?.Id === item.Id) ||
                    (selectionType === 'district' && district?.Id === item.Id) ||
                    (selectionType === 'ward' && ward?.Id === item.Id)) && (
                      <AppIcon icon={{ type: 'MaterialIcons', name: 'check' }} size={20} color={color.base} />
                    )}
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 40 }}
            />
          </View>
        </View>
      </Modal>
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
  inputGroup: {
    marginBottom: SIZE.MAR_L,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  pickerField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: SIZE.PAD_M,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: SIZE.PAD_M,
    fontSize: 16,
  },
  saveButton: {
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZE.MAR_L,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '80%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: SIZE.PAD_M,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZE.PAD_M,
    marginBottom: SIZE.MAR_M,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZE.PAD_M,
    paddingHorizontal: SIZE.PAD_M,
    height: 46,
    borderRadius: 12,
    marginBottom: SIZE.MAR_M,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: SIZE.PAD_M,
    borderBottomWidth: 0.5,
  },
  itemText: {
    fontSize: 16,
  },
});
