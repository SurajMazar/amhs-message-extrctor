import { createLogger, format, LoggerOptions } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/**
 * CHECK IF IT IS TEST ENV
 */
export const isTesting = () => {
    return process.env.NODE_ENV === 'test';
};
/**
 * LOGGER FORMAT
 */
const logFormat = format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
    }),
);

/**
 * APPLICATION LOGS
 */
export const customLoggerOptions: LoggerOptions = {
    format: logFormat,
    transports: [
        new DailyRotateFile({
            filename: 'logs/app/atfm-log-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d',
            format: format.combine(format.timestamp(), format.json()),
        }),
    ],
};

/**
 * INSTANCE FOR NORMAL
 */
export const logger = createLogger(customLoggerOptions);
