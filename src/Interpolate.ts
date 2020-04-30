import { logContext, logMessage } from "./Logger";

/**
 * This is an approximation of the interpolate() function given in the PSR-3 spec
 * in section 1.2: https://www.php-fig.org/psr/psr-3/
 *
 * @param {string} message
 * @param {logContext} context
 */
export function interpolate(message: logMessage, context: logContext)
{
    // let replace: Map<string, string> = new Map();
    for (let [key, val] of Object.entries(context)) {
        if (typeof val === 'string') {
            message.replace('{' + key + '}', val);
        }
    }
}
