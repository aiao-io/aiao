import type { Model as SequelizeModel, ModelStatic } from 'sequelize';

export type SequelizeRepository<Model, CreateModel = Model> = ModelStatic<SequelizeModel<Model, CreateModel> & Model>;
