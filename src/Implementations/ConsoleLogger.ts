/// <reference path="../Logger.ts" />

import { AbstractLogger, logMessage, logContext } from "../Logger";
import * as fs from 'fs';
import * as tty from 'tty';
import * as process from 'child_process';

/**
 * This Logger can be used to avoid conditional log calls.
 *
 * Logging should always be optional, and if no logger is provided to your
 * library creating a NullLogger instance to have something to throw logs at
 * is a good way to avoid littering your code with `if ($this->logger) { }`
 * blocks.
 *
 */
export class ConsoleLogger extends AbstractLogger
{
    ttyDevice: (number | null);

    constructor(ttyDevicePath: (string | null) = null)
    {
        super();

        if (ttyDevicePath === null) {
            let stdioDevice = ConsoleLogger.checkStdioForTerm();

            if (stdioDevice === null) {
                let checkPaths = ConsoleLogger.checkSecondaryForTerm();
                for (let path of checkPaths) {
                    if(fs.existsSync(path)) {
                        let pathfd = fs.openSync(path, 'rb');
                        if (tty.isatty(pathfd)) {
                            this.ttyDevice = pathfd;
                            break;
                        }
                    }
                }
            }
        } else {
            this.ttyDevice = fs.openSync(ttyDevicePath, 'rb');
        }
    }

    /**
     * Passes the logging information to the tty, using color...
     */
    public log(level: any, message: logMessage, context: logContext): void
    {
        let formattedMessage: string = "[" + level + "] " + message + "\n";

        if (this.ttyDevice !== null) {
            fs.write(this.ttyDevice, formattedMessage, null,  'utf8', () => { });
        } else {
            console.log(formattedMessage);
        }
    }

    private static checkStdioForTerm(): (number | null)
    {
        let ttyDescriptor: (number | undefined) = [1, 2].find(tty.isatty);
        if (ttyDescriptor === undefined) {
            return null;
        }

        return ttyDescriptor;
    }

    /**
     * Executes the FSF's tty(1) command, which  prints the file name of the terminal connected to standard input
     *
     * @returns {any}
     */
    private static checkSecondaryForTerm(): Array<string>
    {
        let potentialDevicePaths: Array<string> = new Array<string>();

        let ttyCommandOutput: string = process.execSync('tty').toString();
        if (fs.existsSync(ttyCommandOutput)) {
            potentialDevicePaths.push(ttyCommandOutput);
        }

        if (fs.existsSync('/dev/tty')) { // Last Ditch Effort
            potentialDevicePaths.push('/dev/tty');
        }

        return potentialDevicePaths;
    }
}
