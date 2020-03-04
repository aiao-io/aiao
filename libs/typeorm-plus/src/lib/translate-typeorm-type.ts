import Sequelize from 'sequelize';

export function translateTypeormType(type: string | any) {
  switch (type) {
    case Number:
    case 'numeric':
      return Sequelize.NUMBER;
    case 'int':
      return Sequelize.INTEGER;
    case String:
    case 'xml':
      return Sequelize.STRING;
    case 'enum':
      return Sequelize.ENUM;
    case 'jsonb':
      return Sequelize.JSONB;
    case Boolean:
    case 'boolean':
      return Sequelize.BOOLEAN;
    case 'timestamptz':
    case 'timestamp':
    case Date:
    case 'date':
      return Sequelize.DATE;
    case 'time':
      return Sequelize.TIME;
    case 'smallint':
      return Sequelize.SMALLINT;
    case 'bigint':
      return Sequelize.BIGINT;
    case 'character varying':
      return Sequelize.ARRAY(Sequelize.STRING);
    case 'uuid':
      return Sequelize.UUID;
    case 'json':
      return Sequelize.JSON;
    default:
      throw new Error(`type: ${type} not support`);
  }
}
