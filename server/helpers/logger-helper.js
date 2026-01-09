import chalk from 'chalk';

const MAX_STRING_LENGTH = 100;

class Logger {
    static sanitize(data) {
        if (!data) return data;

        // Handle strings
        if (typeof data === 'string') {
            // Check for Base64 pattern (rough check: long, no spaces, ends with =)
            if (data.length > 500 && /^[A-Za-z0-9+/]+={0,2}$/.test(data)) {
                return `[Base64 String - Length: ${data.length}]`;
            }
            if (data.length > MAX_STRING_LENGTH) {
                return data.substring(0, MAX_STRING_LENGTH) + '... [TRUNCATED]';
            }
            return data;
        }

        // Handle arrays
        if (Array.isArray(data)) {
            return data.map(item => this.sanitize(item));
        }

        // Handle objects
        if (typeof data === 'object') {
            const sanitized = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    // Specific keys to summarize/obfuscate
                    if (key.toLowerCase().includes('image') && typeof data[key] === 'string' && data[key].length > 100) {
                        sanitized[key] = `[Image Data - Length: ${data[key].length}]`;
                    } else if (key.toLowerCase().includes('buffer')) {
                        sanitized[key] = `[Buffer Data]`;
                    } else {
                        sanitized[key] = this.sanitize(data[key]);
                    }
                }
            }
            return sanitized;
        }

        return data;
    }

    static formatMessage(data) {
        if (typeof data === 'string') return data;
        return JSON.stringify(this.sanitize(data), null, 2);
    }

    static info(message, data = null) {
        const prefix = chalk.bgBlue.white.bold(' INFO ');
        const timestamp = chalk.gray(new Date().toLocaleTimeString());
        console.log(`${prefix} ${timestamp} ${chalk.blue(message)}`);
        if (data) console.log(this.formatMessage(data));
    }

    static success(message, data = null) {
        const prefix = chalk.bgGreen.black.bold(' SUCCESS ');
        const timestamp = chalk.gray(new Date().toLocaleTimeString());
        console.log(`${prefix} ${timestamp} ${chalk.green(message)}`);
        if (data) console.log(this.formatMessage(data));
    }

    static warn(message, data = null) {
        const prefix = chalk.bgYellow.black.bold(' WARN ');
        const timestamp = chalk.gray(new Date().toLocaleTimeString());
        console.log(`${prefix} ${timestamp} ${chalk.yellow(message)}`);
        if (data) console.log(this.formatMessage(data));
    }

    static error(message, error = null) {
        const prefix = chalk.bgRed.white.bold(' ERROR ');
        const timestamp = chalk.gray(new Date().toLocaleTimeString());
        console.error(`${prefix} ${timestamp} ${chalk.red(message)}`);
        if (error) {
            if (error instanceof Error) {
                console.error(chalk.red(error.stack));
            } else {
                console.error(this.formatMessage(error));
            }
        }
    }

    static debug(message, data = null) {
        const prefix = chalk.bgMagenta.white.bold(' DEBUG ');
        const timestamp = chalk.gray(new Date().toLocaleTimeString());
        console.log(`${prefix} ${timestamp} ${chalk.magenta(message)}`);
        if (data) console.log(this.formatMessage(data));
    }
}

export default Logger;
