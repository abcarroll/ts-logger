import { logMessage, logContext } from "./Logger";

// My own note:
// return types are void in the jsdoc and any in the actual type
// which one?

/**
 * Describes a logger instance.
 *
 * The message MUST be a string or object implementing __toString().
 *
 * The message MAY contain placeholders in the form: {foo} where foo
 * will be replaced by the context data in key "foo".
 *
 * The context array can contain arbitrary data. The only assumption that
 * can be made by implementors is that if an Exception instance is given
 * to produce a stack trace, it MUST be in a key named "exception".
 *
 * See https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
 * for the full interface specification.
 *
 */
export interface LoggerInterface
{
    /**
     * System is unusable.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    emergency(message: logMessage, context: logContext): any;

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
    alert(message: logMessage, context: logContext): any;

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
    critical(message: logMessage, context: logContext): any;

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    error(message: logMessage, context: logContext): any;

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
    warning(message: logMessage, context: logContext): any;

    /**
     * Normal but significant events.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    notice(message: logMessage, context: logContext): any;

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
    info(message: logMessage, context: logContext): any;

    /**
     * Detailed debug information.
     *
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     */
    debug(message: logMessage, context: logContext): any;

    /**
     * Logs with an arbitrary level.
     *
     * @param level
     * @param {string} message
     * @param {logContext} context
     *
     * @return void
     *
     * @throws \Psr\Log\InvalidArgumentException
     */
    log(level: any, message: any, context: logContext): any;
}

