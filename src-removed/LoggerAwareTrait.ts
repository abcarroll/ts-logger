/// <reference path="Logger.ts" />

import { LoggerInterface } from "./Logger";

/**
 * Basic Implementation of LoggerAwareInterface.
 *
 * @mixin
 */
export class LoggerAwareTrait
{
    /**
     * The logger instance.
     *
     * @var LoggerInterface
     */
    protected _logger;

    /**
     * Sets a logger.
     *
     * @param {LoggerInterface} logger
     */
    public setLogger(logger: LoggerInterface): void
    {
        this._logger = logger;
    }
}
