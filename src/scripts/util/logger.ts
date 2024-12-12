
export enum LogLevel {
    Debug,
    Info,
    Warn,
    Error,
}

export const DEFAULT_LOG_LEVEL: LogLevel = LogLevel.Debug;

export abstract class LoggerService {
    abstract getLevel(): LogLevel;
    abstract setLevel(level: LogLevel): void;

    abstract debug(message?: string, ...args: unknown[]): void;
    abstract info(message?: string, ...args: unknown[]): void;
    abstract warn(message?: string, ...args: unknown[]): void;
    abstract error(message?: string, ...args: unknown[]): void;
}

export class ConsoleLogger implements LoggerService {

    public constructor(
        private level: LogLevel = DEFAULT_LOG_LEVEL
    ) {}

    public setLevel(level: LogLevel): void {
        if (this.level !== level) {
            this.level = level;
        }
    }

    public getLevel(): LogLevel {
        return this.level;
    }

    public debug(message?: string, ...args: unknown[]): void {
        this.log(LogLevel.Debug, message, ...args);
    }

    public info(message?: string, ...args: unknown[]): void {
        this.log(LogLevel.Info, message, ...args);
    }

    public warn(message?: string, ...args: unknown[]): void {
        this.log(LogLevel.Warn, message, ...args);
    }

    public error(message?: string, ...args: unknown[]): void {
        this.log(LogLevel.Error, message, ...args);
    }

    private log(level: LogLevel, message?: string, ...args: unknown[]): void {
        if (this.level > level) {
            return;
        }

        const prefixedMessage =  `[${new Date().toISOString()}] MHCT: ${message}`;
        switch (level) {
            case LogLevel.Debug:
                console.debug(prefixedMessage, ...args);
                break;
            case LogLevel.Info:
                console.info(prefixedMessage, ...args);
                break;
            case LogLevel.Warn:
                console.warn(prefixedMessage, ...args);
                break;
            case LogLevel.Error:
                console.error(prefixedMessage, ...args);
                break;
            default:
                console.log(prefixedMessage, ...args);
                break;
        }
    }
}
