const isDev = process.env.NODE_ENV !== "production";

export const logger = {
    log: (...args: any[]) => isDev && console.log(...args),
    warn: (...args: any[]) => isDev && console.warn(...args),
    error: (...args: any[]) => console.error(...args), // keep errors
};
