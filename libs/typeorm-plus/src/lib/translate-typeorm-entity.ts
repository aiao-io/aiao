import { flatten, isArray } from 'lodash';
import { IndexType, ModelAttributeColumnOptions, ModelAttributes, ModelOptions } from 'sequelize';
import { EntityMetadata } from 'typeorm';

import { translateTypeormType } from './translate-typeorm-type';

interface SeqModel {
  modelName: string;
  attributes: ModelAttributes;
  options: ModelOptions;
}

export function translateTypeOrmEntity(metadata: EntityMetadata): SeqModel {
  const { name: modelName, columns, tableName, schema, createDateColumn, updateDateColumn, indices } = metadata;

  const uniqueArrs: any[] = metadata.uniques.map(d => d.givenColumnNames);
  const uniques = flatten(uniqueArrs);

  // ModelAttributes
  const attributes: { [name: string]: ModelAttributeColumnOptions } = {};
  columns.forEach(col => {
    const type = col.type;
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
      /*
          外键设置 一个 column 可以保持一致性
          @OneToOne(() => Profile, { cascade: true })
          @JoinColumn()
          profile: Profile;
          // fk
          @Column({ nullable: true })
          profileId: number;
      */
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

    if (relationMetadata?.isWithJoinColumn) {
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
      let type!: IndexType;
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
        fields
      };
    });
  }

  return {
    modelName,
    attributes,
    options
  };
}
