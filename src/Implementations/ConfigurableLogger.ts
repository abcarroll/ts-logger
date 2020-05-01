/// <reference path="../Logger.ts" />

import { AbstractLogger, logMessage, logContext } from "../Logger";
import { LoggerInterface } from "../LoggerInterface";
import { logLevelValue } from "../Logger";

type logMessageFilterCallback = (level: any, message: logMessage, context: logContext) => boolean;

/**
 * A configurable logger that wraps other loggers, creating a logging switchboard.
 *
 */
export class ConfigurableLogger extends AbstractLogger
{
    downstreamLoggers: Array<[LoggerInterface, logMessageFilterCallback]> = new Array<[LoggerInterface, logMessageFilterCallback]>;

    logLevel(downstream: LoggerInterface, forLevel: logLevelValue)
    {
        this.downstreamLoggers.push([
            downstream,
            (inputLevel: logLevelValue) => {
                return inputLevel === forLevel;
            }
        ]);
    }

    messageMatches(downstream: LoggerInterface, matches: RegExp)
    {
        matches.compile();

        this.downstreamLoggers.push([
            downstream,
            (_, message: logMessage) => {
                return matches.test(logMessage);
            }
        ]);
    }

    when(downstream: LoggerInterface, when: logMessageFilterCallback)
    {
        this.downstreamLoggers.push([downstream,  when]);
    }

    /**
     * Passes the logging information to the tty, using color...
     */
    public log(level: any, message: logMessage, context: logContext): void
    {
        for (let [upstreamLogger, condition] of this.downstreamLoggers) {
            if (condition(level,  logMessage, logContext)) {
                upstreamLogger.log(level,  logMessage, logContext);
            }
        }
    }
}
