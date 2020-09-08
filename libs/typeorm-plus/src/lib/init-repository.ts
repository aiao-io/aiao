import { get } from 'lodash';
import sequelize, { Sequelize } from 'sequelize';
import { EntityMetadata } from 'typeorm';

// import { initTreeRepository } from './init-tree-reposiory';

export function initRepository(metadata: EntityMetadata, ormSequelize: Sequelize) {
  // const isTreeRepository = repository instanceof TreeRepository;
  // repository.metadata;
  // if (isTreeRepository) {
  // initTreeRepository(repository, ormSequelize);
  // console.log('');
  // }

  const { name: modelName, relations, schema } = metadata;
  const model: any = ormSequelize.modelManager.getModel(modelName);
  relations
    .filter(({ isTreeChildren, isTreeParent }) => isTreeChildren === false && isTreeParent === false)
    .forEach(relation => {
      const { relationType, propertyName, inverseRelation, foreignKeys, joinTableName } = relation;
      const fkName = get(foreignKeys, '[0].columnNames[0]');
      const inverseModelName = get(relation.inverseEntityMetadata, 'name');
      const inverseModel: any = ormSequelize.modelManager.getModel(inverseModelName);
      const inverseModelForeignKey = get(inverseRelation, 'foreignKeys[0].columnNames[0]');
      if (!model || !inverseModel) {
        console.error('未找到', modelName, propertyName);
        return;
      }

      // 配置关系
      switch (relationType) {
        case 'one-to-many':
          model.hasMany(inverseModel, { as: propertyName, foreignKey: { name: inverseModelForeignKey } });
          break;
        case 'many-to-one':
          model.belongsTo(inverseModel, { as: propertyName, foreignKey: { name: fkName } });
          break;
        case 'one-to-one':
          const inverseJoinColumns = relation.inverseRelation?.joinColumns || [];
          if (relation.joinColumns.length > 0 && inverseJoinColumns.length > 0) {
            throw new Error(`modelName: ${modelName}, 一对一关系不能两边 使用 joinColumns`);
          }
          if (relation.joinColumns.length === 0 && inverseJoinColumns.length === 0) {
            throw new Error('一对一关系错误, 至少一边有 join Columns');
          }
          if (relation.joinColumns.length > 0) {
            model.belongsTo(inverseModel, { as: propertyName });
          } else {
            model.hasOne(inverseModel, { as: propertyName, foreignKey: { name: inverseModelForeignKey } });
          }
          break;
        case 'many-to-many':
          const inverseModelPropertyName = get(inverseRelation, 'propertyName');
          const modelFK = get(relation, 'joinColumns[0].databaseName');
          const inverseModelFK = get(relation, 'inverseJoinColumns[0].databaseName');
          if (modelFK && inverseModelFK) {
            ormSequelize.define(
              joinTableName,
              {
                [modelFK]: sequelize.INTEGER,
                [inverseModelFK]: sequelize.INTEGER
              },
              { tableName: joinTableName, schema, createdAt: false, updatedAt: false }
            );
            model.belongsToMany(inverseModel, {
              as: propertyName,
              through: joinTableName,
              foreignKey: modelFK
            });
            inverseModel.belongsToMany(model, {
              as: inverseModelPropertyName,
              through: joinTableName,
              foreignKey: inverseModelFK
            });
          }
          break;
        default:
          break;
      }
    });
}
