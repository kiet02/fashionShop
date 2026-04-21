import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {

  authenticate(options: {
    title?: string;
    description?: string;
  }): Promise<boolean>;
  isSensorAvailable(): Promise<{
    available: boolean;
    biometryType: string;
    error?: string;
  }>;
  openSettings(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeBiometric');
