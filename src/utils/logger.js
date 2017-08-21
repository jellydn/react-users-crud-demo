import logger from 'loglevel';

const dev = process.env.NODE_ENV !== 'production';
logger.setLevel(dev ? 'info' : 'error');

export default logger;
