export type builtInLevelValue = 'info' | 'debug' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency';
export type logLevelValue = string;

export type logMessage = string;
export type logContext = Map<string, any> | ArrayLike<any>;

export * from "./LogLevel";
export * from "./LoggerInterface";
export * from "./AbstractLogger";
export * from "./LoggerAwareInterface";
export * from "./InvalidArgumentException";
export * from "./NullLogger";
