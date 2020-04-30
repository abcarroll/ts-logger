/// <reference path="Logger.ts" />

import { LogLevel, logLevelValue, logMessage, logContext, LoggerInterface } from "./Logger";

/**
 * This is a simple Logger implementation that other Loggers can inherit from.
 *
 * It simply delegates all log-level-specific methods to the `log` method to
 * reduce boilerplate code that a simple Logger that does the same thing with
 * messages regardless of the error level has to implement.
 */
export abstract class AbstractLogger implements LoggerInterface
{
    /**
     * System is unusable.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    public emergency(message: logMessage, context: logContext = [])
    {
        this.log(LogLevel.EMERGENCY, message, context);
    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    public alert(message: logMessage, context: logContext = [])
    {
        this.log(LogLevel.ALERT, message, context);
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    public critical(message: logMessage, context: logContext = [])
    {
        this.log(LogLevel.CRITICAL, message, context);
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    public error(message: logMessage, context: logContext = [])
    {
        this.log(LogLevel.ERROR, message, context);
    }

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    public warning(message: logMessage, context: logContext = [])
    {
        this.log(LogLevel.WARNING, message, context);
    }

    /**
     * Normal but significant events.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    public notice(message: logMessage, context: logContext = [])
    {
        this.log(LogLevel.NOTICE, message, context);
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    public info(message: logMessage, context: logContext = [])
    {
        this.log(LogLevel.INFO, message, context);
    }

    /**
     * Detailed debug information.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    public debug(message: logMessage, context: logContext = [])
    {
        this.log(LogLevel.DEBUG, message, context);
    }

    // Note, -- log() is not defined in the AbstractLogger within the PHP version,
    // as PHP does not require you to re-define empty methods within a Interface->Abstract chain.
    abstract log(level: logLevelValue, message: logMessage, context: logContext): any;
}

