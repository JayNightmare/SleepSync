package com.sleepsync

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class HealthConnectPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext) = emptyList<ViewManager<*, *>>()

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(HealthConnectModule(reactContext))
    }
}
