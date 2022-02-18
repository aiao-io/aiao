import type { Model as SequelizeModel, ModelStatic } from 'sequelize';

export type SequelizeRepository<Model = any> = ModelStatic<SequelizeModel<Model>>;
