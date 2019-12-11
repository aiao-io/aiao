import flatten from 'lodash/flatten';
import isArray from 'lodash/isArray';
import { IndexType, ModelAttributeColumnOptions, ModelAttributes, ModelOptions } from 'sequelize';
import { Repository } from 'typeorm';

import { translateTypeormType } from './translate-typeorm-type';

export function translateTypeOrmEntity(
  entity: Repository<any>
): { modelName: string; attributes: ModelAttributes; options: ModelOptions } {
  const { name: modelName, columns, tableName, schema, createDateColumn, updateDateColumn, indices } = entity.metadata;

  const uniqueArrs: any[] = entity.metadata.uniques.map(d => d.givenColumnNames);
  const uniques = flatten(uniqueArrs);

  // ModelAttributes
  const attributes: { [name: string]: ModelAttributeColumnOptions } = {};
  columns.forEach(col => {
    const _type = col.type as any;
    const type = _type.name || _type;
    const {
      propertyName,
      databaseName,
      isNullable,
      isGenerated,
      comment,
      isPrimary,
      relationMetadata,
      entityMetadata,
      default: defaultValue,
      enum: enumValues
    } = col;

    if (databaseName !== propertyName) {
      console.error('未设置 fk', modelName, propertyName, databaseName);
    }

    const columnOptions: ModelAttributeColumnOptions = {
      field: databaseName,
      allowNull: isNullable,
      autoIncrement: isGenerated,
      comment: comment,
      primaryKey: isPrimary,
      type: translateTypeormType(type),
      unique: uniques.includes(databaseName)
    };

    if (relationMetadata && relationMetadata.isWithJoinColumn) {
      columnOptions.references = { model: entityMetadata.name, key: databaseName };
    }

    if (defaultValue) {
      columnOptions.defaultValue = defaultValue;
    }

    if (enumValues) {
      columnOptions.values = enumValues as any;
    }

    attributes[propertyName] = columnOptions;
  });

  // ModelOptions
  const options: ModelOptions = {
    tableName: tableName,
    schema: schema
  };

  if (createDateColumn) {
    options.createdAt = createDateColumn.databaseName;
  } else {
    options.createdAt = false;
  }

  if (updateDateColumn) {
    options.updatedAt = updateDateColumn.databaseName;
  } else {
    options.updatedAt = false;
  }

  if (indices.length > 0) {
    options.indexes = indices.map(({ name, isFulltext, isUnique, givenColumnNames, isSpatial }) => {
      let type: IndexType;
      if (isFulltext) {
        type = 'FULLTEXT';
      } else if (isUnique) {
        type = 'UNIQUE';
      } else if (isSpatial) {
        type = 'SPATIAL';
      }
      let fields: string[] = [];
      if (isArray(givenColumnNames)) {
        fields = givenColumnNames;
      }
      return {
        type,
        name,
        unique: isUnique,
        fields: givenColumnNames as any
      };
    });
  }

  return {
    modelName,
    attributes,
    options
  };
}
