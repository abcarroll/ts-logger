/// <reference path="Logger.ts" />

import { AbstractLogger, logMessage, logContext } from "./Logger";

/**
 * This Logger can be used to avoid conditional log calls.
 *
 * Logging should always be optional, and if no logger is provided to your
 * library creating a NullLogger instance to have something to throw logs at
 * is a good way to avoid littering your code with `if ($this->logger) { }`
 * blocks.
 *
 */
export class NullLogger extends AbstractLogger
{
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
    public log(level: any, message: logMessage, context: logContext): void
    {
        // noop
    }
}
