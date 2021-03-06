import { createClient } from 'redis';
import { createPool } from 'mysql';
import { createConnection, Connection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { entities } from '../entities';
import { GLOBAL_CONFIG } from './config';

export const redisCfg = {
  host: 'localhost',
  port: 6379
};

export const redis = createClient(redisCfg.port, redisCfg.host);

export const mysqlCfg: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'range_bt',
  entities: entities,
  logging: 'all',
  synchronize: GLOBAL_CONFIG.synchronizeTable
};

export const createDBConnection = async () => {
  const connection = await createConnection({
    ...mysqlCfg
  })
    .then(connect => {
      console.log('mysql connect success!');
      return connect;
    })
    .catch(err => {
      console.log('mysql connect fail!', err);
      return err;
    });
};
