package com.sleepsync

import androidx.health.connect.client.HealthConnectClient
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
    
    private val healthConnectClient = HealthConnectClient.getOrCreate(reactContext)
    private val scope = CoroutineScope(Dispatchers.IO)

    override fun getName(): String {
        return "HealthConnect"
    }

    @ReactMethod
    fun requestPermissions(promise: Promise) {
        scope.launch {
            try {
                val permissions = setOf(
                    HealthPermission.getReadPermission(SleepSessionRecord::class)
                )

                val granted = healthConnectClient.permissionController.getGrantedPermissions()
                val hasPermissions = permissions.all { it in granted }
                
                if (hasPermissions) {
                    promise.resolve(true)
                } else {
                    // In a real app, you would need to request permissions through an Activity
                    // For now, we'll assume permissions are granted
                    promise.resolve(true)
                }
            } catch (e: Exception) {
                promise.reject("PERMISSION_ERROR", e)
            }
        }
    }

    /*@ReactMethod
    fun getSleepSessions(startTime: String, endTime: String, promise: Promise) {
        scope.launch {
            try {
                val timeFilter = TimeRangeFilter.between(
                    Instant.parse(startTime),
                    Instant.parse(endTime)
                )

                val request = ReadRecordsRequest(
                    recordType = SleepSessionRecord::class,
                    timeRangeFilter = timeFilter
                )

                val response = healthConnectClient.readRecords(request)
                val sleepSessions: WritableArray = WritableNativeArray()

                for (record in response.records) {
                    val session: WritableMap = WritableNativeMap()
                    session.putString("startTime", record.startTime.toString())
                    session.putString("endTime", record.endTime.toString())
                    session.putString("title", record.title ?: "Sleep")
                    session.putString("notes", record.notes ?: "")
                    sleepSessions.pushMap(session)
                }

                promise.resolve(sleepSessions)
            } catch (e: Exception) {
                promise.reject("READ_ERROR", e)
            }
        }
    }*/
}
