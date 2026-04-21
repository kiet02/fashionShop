import NativeBiometric from './NativeBiometric';

const Biometric = {
  authenticate: async (
    options: { title?: string; description?: string; subTitle?: string } = {},
  ) => {
    return await NativeBiometric.authenticate(options);
  },
  isSensorAvailable: () => NativeBiometric.isSensorAvailable(),
  openSettings: () => NativeBiometric.openSettings(),
};

export default Biometric;
