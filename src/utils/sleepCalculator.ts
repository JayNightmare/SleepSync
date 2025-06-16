/**
 * Utility functions for sleep time calculations
 */

/**
 * Calculates the bedtime based on wake-up time, sleep duration, and wind-down period
 *
 * @param wakeUpTime The desired wake-up time
 * @param sleepDuration Sleep duration in hours
 * @param windDownPeriod Wind-down period in minutes
 * @returns Object containing bedtime and wind-down start time
 */
export const calculateSleepTimes = (
    wakeUpTime: Date,
    sleepDuration: number,
    windDownPeriod: number,
): { bedtime: Date; windDownTime: Date } => {
    // Clone the wake-up time to avoid modifying the original
    const bedtime = new Date(wakeUpTime);

    // Calculate sleep duration in milliseconds
    const sleepDurationMs = sleepDuration * 60 * 60 * 1000;

    // Subtract sleep duration from wake-up time to get bedtime
    bedtime.setTime(bedtime.getTime() - sleepDurationMs);

    // Calculate wind-down time
    const windDownTime = new Date(bedtime);

    // Convert wind-down period from minutes to milliseconds and subtract
    const windDownPeriodMs = windDownPeriod * 60 * 1000;
    windDownTime.setTime(windDownTime.getTime() - windDownPeriodMs);

    return { bedtime, windDownTime };
};

/**
 * Format time in 12-hour (AM/PM) or 24-hour format
 *
 * @param date The date object to format
 * @param use24HourFormat Whether to use 24-hour format
 * @returns Formatted time string
 */
export const formatTime = (
    date: Date,
    use24HourFormat: boolean = false,
): string => {
    if (use24HourFormat) {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    } else {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    }
};
