/// <reference path="Logger.ts" />

/**
 * Describes log levels.
 */
export class LogLevel
{
    public static readonly EMERGENCY: string = 'emergency';
    public static readonly ALERT: string = 'alert';
    public static readonly CRITICAL: string = 'critical';
    public static readonly ERROR: string = 'error';
    public static readonly WARNING: string = 'warning';
    public static readonly NOTICE: string = 'notice';
    public static readonly INFO: string = 'info';
    public static readonly DEBUG: string = 'debug';
}

// stuff I added...  I don't know what the hell makes sense here =)
/*
public get level(): string
{
    return this._level;
}

_level: string;

toString()
{
    return this._level;
}*/
