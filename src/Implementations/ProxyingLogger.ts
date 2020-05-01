import { AbstractLogger } from "../AbstractLogger";
import { LoggerInterface } from "../LoggerInterface";
import { logContext, logLevelValue, logMessage } from "../Logger";

/**
 * An extension upon the base AbstractLogger which allows you to create a logger which wraps a single other logger quickly.
 */
export abstract class ProxyingLogger extends AbstractLogger
{
    _upstream: LoggerInterface;

    public log(level: logLevelValue, message: logMessage, context: logContext): any
    {
        this._upstream.log(level,  message,  context);
    }
}
