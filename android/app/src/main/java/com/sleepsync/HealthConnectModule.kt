package com.sleepsync

import android.content.Intent
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.SleepSessionRecord
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class HealthConnectModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var healthConnectClient: HealthConnectClient? = null

    private fun initHealthConnectClient(): Boolean {
        return if (healthConnectClient == null && HealthConnectClient.isAvailable(reactApplicationContext)) {
            healthConnectClient = HealthConnectClient.getOrCreate(reactApplicationContext)
            true
        } else {
            healthConnectClient != null
        }
    }

    private val scope = CoroutineScope(Dispatchers.IO)

    override fun getName(): String = "HealthConnect"

    @ReactMethod
    fun requestPermissions(promise: Promise) {
        scope.launch {
            try {
                if (!initHealthConnectClient()) {
                    promise.reject("HEALTH_CONNECT_UNAVAILABLE", "Health Connect is not available on this device.")
                    return@launch
                }

                val client = healthConnectClient!!
                val permissions = setOf(
                    HealthPermission.getReadPermission(SleepSessionRecord::class)
                )

                val granted = client.permissionController.getGrantedPermissions()
                val hasPermissions = permissions.all { it in granted }

                if (hasPermissions) {
                    promise.resolve(true)
                } else {
                    val intent = PermissionController.createRequestPermissionResultContract()
                        .createIntent(reactApplicationContext, permissions)

                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    reactApplicationContext.startActivity(intent)

                    promise.resolve(true)
                }
            } catch (e: Exception) {
                promise.reject("PERMISSION_ERROR", e)
            }
        }
    }

    @ReactMethod
    fun isHealthConnectAvailable(promise: Promise) {
        promise.resolve(HealthConnectClient.isAvailable(reactApplicationContext))
    }
}
