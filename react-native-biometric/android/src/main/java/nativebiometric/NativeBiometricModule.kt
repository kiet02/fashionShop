package com.nativebiometric

import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.provider.Settings
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricManager.Authenticators.BIOMETRIC_STRONG
import androidx.biometric.BiometricManager.Authenticators.DEVICE_CREDENTIAL
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*


class NativeBiometricModule(reactContext: ReactApplicationContext) : NativeBiometricSpec(reactContext) {

    override fun getName(): String = NAME

    override fun authenticate(options: ReadableMap, promise: Promise) {
        UiThreadUtil.runOnUiThread {
            val activity = reactApplicationContext.currentActivity as? FragmentActivity
            if (activity == null) {
                promise.reject("ACTIVITY_NOT_FOUND", "Không tìm thấy FragmentActivity")
                return@runOnUiThread
            }

            val title = if (options.hasKey("title")) options.getString("title") else null
            val description = if (options.hasKey("description")) options.getString("description") else null
            val subTitle = if(options.hasKey("subTitle")) options.getString("subTitle") else null

            val finalTitle = if (title.isNullOrBlank()) "fashionShop Security" else title
            val finalDescription = description ?: ""
            val finalSubTitle = subTitle ?: ""

            val executor = ContextCompat.getMainExecutor(activity)
            val biometricPrompt = BiometricPrompt(activity, executor, object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    super.onAuthenticationSucceeded(result)
                    promise.resolve(true)
                }

                override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                    super.onAuthenticationError(errorCode, errString)
                    promise.reject(errorCode.toString(), errString.toString())
                }

                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                }
            })

            val promptInfo = BiometricPrompt.PromptInfo.Builder()
                .setTitle(finalTitle)
                .setDescription(finalDescription)
                .setSubtitle(finalSubTitle)
                .setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
                .build()

            biometricPrompt.authenticate(promptInfo)
        }
    }

    override fun isSensorAvailable(promise: Promise) {
        val activity = reactApplicationContext.currentActivity
        if (activity == null) {
            promise.reject("ACTIVITY_NULL", "Activity is null")
            return
        }

        val biometricManager = BiometricManager.from(activity)
        val canAuth = biometricManager.canAuthenticate(BIOMETRIC_STRONG)

        val resultMap = Arguments.createMap()

        when (canAuth) {
            BiometricManager.BIOMETRIC_SUCCESS -> {
                resultMap.putBoolean("available", true)
                resultMap.putString("biometryType", getActualBiometryType())
                resultMap.putString("error", "")
            }
            BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> {
                resultMap.putBoolean("available", false)
                resultMap.putString("biometryType", "None")
                resultMap.putString("error", "NOT_ENROLLED")
            }
            BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE -> {
                resultMap.putBoolean("available", false)
                resultMap.putString("biometryType", "None")
                resultMap.putString("error", "NO_HARDWARE")
            }
            BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE -> {
                resultMap.putBoolean("available", false)
                resultMap.putString("biometryType", "None")
                resultMap.putString("error", "HW_UNAVAILABLE")
            }
            BiometricManager.BIOMETRIC_ERROR_SECURITY_UPDATE_REQUIRED -> {
                resultMap.putBoolean("available", false)
                resultMap.putString("biometryType", "None")
                resultMap.putString("error", "SECURITY_UPDATE_REQUIRED")
            }
            BiometricManager.BIOMETRIC_ERROR_UNSUPPORTED -> {
                resultMap.putBoolean("available", false)
                resultMap.putString("biometryType", "None")
                resultMap.putString("error", "UNSUPPORTED")
            }
            else -> {
                resultMap.putBoolean("available", false)
                resultMap.putString("biometryType", "None")
                resultMap.putString("error", "STATUS_UNKNOWN")
            }
        }
        promise.resolve(resultMap)
    }

    override fun openSettings() {
        val activity = reactApplicationContext.currentActivity ?: return
        val intent = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            Intent(Settings.ACTION_BIOMETRIC_ENROLL).apply {
                putExtra(Settings.EXTRA_BIOMETRIC_AUTHENTICATORS_ALLOWED, BIOMETRIC_STRONG)
            }
        } else {
            Intent(Settings.ACTION_SECURITY_SETTINGS)
        }
        activity.startActivity(intent)
    }

    private fun getActualBiometryType(): String {
        val pm = reactApplicationContext.packageManager
        val hasFace = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            pm.hasSystemFeature(PackageManager.FEATURE_FACE)
        } else false
        val hasFingerprint = pm.hasSystemFeature(PackageManager.FEATURE_FINGERPRINT)

        return when {
            hasFace -> "FaceID"
            hasFingerprint -> "Fingerprint"
            else -> "Biometrics"
        }
    }
    companion object {
        const val NAME = "NativeBiometric"
    }
}