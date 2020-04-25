

const log4js = require('log4js');
const config = require('config');

log4js.configure(config.get('log4js'));

const logLevel = config.log4js.log_level;
export const LOG = log4js.getLogger('app');

LOG.originalDebugMethod = LOG.debug;
LOG.originalErrorMethod = LOG.error;

LOG.debug = (message: string, ...args: any[]) => {
    debugLevel(LOG_LEVEL.level_2, message, ...args)
}


LOG.trace = (message: string, ...args: any[]) => {
    debugLevel(LOG_LEVEL.level_1, message, ...args)
}

LOG.debugWithLevel = (level: LOG_LEVEL, message: string, ...args: any[]) => {
    debugLevel(level, message, ...args)
}
log4js.getAppLogger = () => {
    return LOG;
}


export function debugLevel(level: LOG_LEVEL, message: string, ...args: any[]) {
    if (level >= logLevel)
        LOG.originalDebugMethod(message, ...args);
}

export enum LOG_LEVEL {
    level_1 = 1,
    level_2,
    level_3,
    level_4,
    level_5
}
