import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';

logger.info(`=================================`);
logger.info(`======= DB_HOST: ${DB_HOST} =====`);
logger.info(`======= DB_PORT: ${DB_PORT} =====`);
logger.info(`======= DB_USER: ${DB_USER} =====`);
logger.info(`======= DB_PASSWORD: ${DB_PASSWORD} =====`);
logger.info(`======= DB_DATABASE: ${DB_DATABASE} =====`);
logger.info(`=================================`);

let sequelize;
try {
  sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: DB_HOST,
    port: +DB_PORT,
    timezone: '+07:00',
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      underscored: true,
      freezeTableName: true,
    },
    pool: {
      min: 0,
      max: 5,
    },
    // logQueryParameters: NODE_ENV === 'development',
    logQueryParameters: true,
    logging: (query, time) => {
      logger.info(time + 'ms' + ' ' + query);
    },
    benchmark: true,
  });

  sequelize.authenticate();
} catch (err) {
  logger.error(err);
}

logger.info(`============== sequelize.authenticate ===================`);

let DB;

try {
  DB = {
    Users: UserModel(sequelize),
    sequelize, // connection instance (RAW queries)
    Sequelize, // library
  };
} catch (err) {
  logger.error(err);
}

export default DB;
