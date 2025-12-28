import app from './app';
import { Config } from './config';
import logger from './config/logger';

const StartServer = () => {
    try {
        const PORT = Config.PORT;
        app.listen(PORT, () => {
            logger.error('testing error log...');
            logger.info(`server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.info(error);
        process.exit(1);
    }
};

StartServer();
