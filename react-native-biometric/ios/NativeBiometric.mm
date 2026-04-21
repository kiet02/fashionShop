#import "NativeBiometric.h"
#import <LocalAuthentication/LocalAuthentication.h>

@implementation NativeBiometric

RCT_EXPORT_MODULE()

// 1. Kiểm tra cảm biến
- (void)isSensorAvailable:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    
    LAContext *context = [[LAContext alloc] init];
    NSError *error = nil;
    BOOL available = [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error];
    
    NSString *biometryType = @"None";
    if (available) {
        if (context.biometryType == LABiometryTypeFaceID) biometryType = @"FaceID";
        else if (context.biometryType == LABiometryTypeTouchID) biometryType = @"TouchID";
    }

    resolve(@{
        @"available": @(available),
        @"biometryType": biometryType,
        @"error": error ? error.localizedDescription : [NSNull null]
    });
}

// 2. Xác thực
- (void)authenticate:(JS::NativeBiometric::SpecAuthenticateOptions &)options 
             resolve:(RCTPromiseResolveBlock)resolve 
              reject:(RCTPromiseRejectBlock)reject {
    LAContext *context = [[LAContext alloc] init];
    NSString *reason = options.description() ?: @"Xác thực để tiếp tục";

    [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics
            localizedReason:reason
                      reply:^(BOOL success, NSError *error) {
        if (success) {
            resolve(@YES);
        } else {
            resolve(@NO);
        }
    }];
}

// 3. Mở Settings
- (void)openSettings {
    dispatch_async(dispatch_get_main_queue(), ^{
        NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
        
        if ([[UIApplication sharedApplication] canOpenURL:url]) {
            [[UIApplication sharedApplication] openURL:url
                                               options:@{}
                                     completionHandler:nil];
        }
    });
}

// Bắt buộc cho TurboModule
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeBiometricSpecJSI>(params);
}

@end