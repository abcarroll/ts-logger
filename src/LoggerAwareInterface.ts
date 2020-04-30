/// <reference path="Logger.ts" />

import { LoggerInterface } from "./LoggerInterface";

/**
 * Describes a logger-aware instance.
 */
export interface LoggerAwareInterface
{
    /**
     * Sets a logger instance on the object.
     *
     * @param {LoggerInterface} logger
     *
     * @return void
     */
     setLogger(logger: LoggerInterface): any;
}
