import { isString } from 'lodash';

import { ConnectionOptions } from './interface';

export function getTypeOrmPlusConnectionToken(connection?: ConnectionOptions) {
  let connectionName = 'default';
  if (isString(connection)) {
    connectionName = connection;
  } else if (connection && connection.name) {
    connectionName = connection.name;
  }

  return `${connectionName}_connection_typeorm_plus`;
}
