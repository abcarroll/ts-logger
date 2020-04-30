/**
 * Nothing to do with PSR-3
 *
 * Something I was working on .... Didn't finish
 */

import { LoggerInterface } from "./LoggerInterface";
import { EventEmitter } from "events";
import { LogLevel } from "./LogLevel";

export class FunctionalLogger extends EventEmitter implements LoggerInterface
{
    private emit = (type: LogLevel | number, ... args): boolean => super.emit(type, ... args);

    public alert(message: logMessage, context: logContext)
    {
        this.emit()
    }

    public critical(message: logMessage, context: logContext)
    {
    }

    public debug(message: logMessage, context: logContext)
    {
    }

    public emergency(message: logMessage, context: logContext)
    {
    }

    public error(message: logMessage, context: logContext)
    {
    }

    public info(message: logMessage, context: logContext)
    {
    }

    public log(level: any, message, context: logContext)
    {
    }

    public notice(message: logMessage, context: logContext)
    {
    }

    public warning(message: logMessage, context: logContext)
    {
    }

}
