import Sequelize from 'sequelize';

export function translateTypeormType(type: string | any) {
  switch (type) {
    case Number:
      return Sequelize.NUMBER;
    case String:
      return Sequelize.STRING;
    case Boolean:
      return Sequelize.BOOLEAN;
    case Date:
      return Sequelize.DATE;
    case `int`:
    case `int2`:
    case `int4`:
    case `int8`:
    case `smallint`:
    case `integer`:
      return Sequelize.INTEGER;
    case `bigint`:
      return Sequelize.BIGINT;
    case `decimal`:
    case `numeric`:
      return Sequelize.DECIMAL;
    case `real`:
      return Sequelize.REAL;
    case `float`:
    case `float4`:
    case `float8`:
    case `double precision`:
      return Sequelize.DOUBLE;
    case `money`:
      return Sequelize.FLOAT;
    case `character varying`:
    case `varchar`:
    case `character`:
    case `char`:
      return Sequelize.STRING;
    case `text`:
      return Sequelize.TEXT;
    case `citext`:
      return Sequelize.CITEXT;
    // case `hstore`:
    case `bytea`:
      return Sequelize.BLOB;
    case `bit`:
    case `varbit`:
    case `bit varying`:
    case `timetz`:
    case `timestamptz`:
    case `timestamp`:
    case `timestamp without time zone`:
    case `timestamp with time zone`:
    case `date`:
      return Sequelize.DATE;
    case `time`:
    case `time without time zone`:
    case `time with time zone`:
      return Sequelize.TIME;
    case `interval`:
      return Sequelize.INTEGER;
    case `bool`:
    case `boolean`:
      return Sequelize.BOOLEAN;
    case `enum`:
      return Sequelize.ENUM;
    case `point`:
    case `line`:
    case `lseg`:
    case `box`:
    case `path`:
    case `polygon`:
    case `circle`:
      return Sequelize.STRING;
    case `cidr`:
      return Sequelize.CIDR;
    case `inet`:
      return Sequelize.INET;
    case `macaddr`:
      return Sequelize.MACADDR;
    // case `tsvector`:
    // case `tsquery`:
    case `uuid`:
      return Sequelize.UUID;
    case `xml`:
    case `json`:
      return Sequelize.JSON;
    case `jsonb`:
      return Sequelize.JSONB;
    case `int4range`:
      return Sequelize.RANGE(Sequelize.INTEGER);
    case `int8range`:
      return Sequelize.RANGE(Sequelize.BIGINT);
    case `numrange`:
      return Sequelize.RANGE(Sequelize.DECIMAL);
    case `tsrange`:
    case `tstzrange`:
      return Sequelize.RANGE(Sequelize.DATE);
    case `daterange`:
      return Sequelize.RANGE(Sequelize.DATEONLY);
    case `geometry`:
      return Sequelize.GEOMETRY;
    case `geography`:
      return Sequelize.GEOGRAPHY;
    // case `cube`:
    default:
      throw new Error(`type: ${type} not support`);
  }
}
