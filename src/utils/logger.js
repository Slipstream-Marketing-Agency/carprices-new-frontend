/**
 * Logging utility for development and production
 * In production, logs can be sent to a monitoring service
 */

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  /**
   * Log info message (development only)
   */
  static info(...args) {
    if (isDevelopment) {
      console.log('[INFO]', ...args);
    }
  }

  /**
   * Log warning message
   */
  static warn(...args) {
    if (isDevelopment) {
      console.warn('[WARN]', ...args);
    }
    // In production, send to monitoring service
    // this.sendToMonitoring('warn', args);
  }

  /**
   * Log error message
   */
  static error(...args) {
    if (isDevelopment) {
      console.error('[ERROR]', ...args);
    }
    // In production, send to monitoring service
    // this.sendToMonitoring('error', args);
  }

  /**
   * Log debug message (development only)
   */
  static debug(...args) {
    if (isDevelopment) {
      console.log('[DEBUG]', ...args);
    }
  }

  /**
   * Send logs to monitoring service (placeholder)
   */
  static sendToMonitoring(level, args) {
    // TODO: Implement monitoring service integration
    // Example: Sentry, LogRocket, DataDog, etc.
    /*
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureMessage(JSON.stringify(args), level);
    }
    */
  }

  /**
   * Log API error with details
   */
  static apiError(endpoint, error, context = {}) {
    const errorInfo = {
      endpoint,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      context,
      timestamp: new Date().toISOString(),
    };

    this.error('API Error:', errorInfo);

    // Send to monitoring in production
    if (!isDevelopment) {
      this.sendToMonitoring('error', errorInfo);
    }
  }

  /**
   * Log performance metrics
   */
  static performance(label, duration) {
    if (isDevelopment) {
      console.log(`[PERFORMANCE] ${label}: ${duration}ms`);
    }
  }
}

export default Logger;
