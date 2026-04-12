/* eslint-disable no-undef */

// Mock NitroModules trước
jest.mock('react-native-nitro-modules', () => ({
  NitroModules: {
    getNativeModule: jest.fn(),
    registerNativeModule: jest.fn(),
  },
}));

// Mock MMKV hoàn toàn
jest.mock('react-native-mmkv', () => {
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      getString: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      getAllKeys: jest.fn(),
      clearAll: jest.fn(),
      addOnValueChangedListener: jest.fn(),
    })),
    useMMKVString: jest.fn(() => ['light', jest.fn()]),
    useMMKVNumber: jest.fn(() => [0, jest.fn()]),
    useMMKVBoolean: jest.fn(() => [true, jest.fn()]),
    useMMKVObject: jest.fn(() => [{}, jest.fn()]),
  };
});

// Các mock khác
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('react-native-vector-icons/EvilIcons', () => 'EvilIcons');
