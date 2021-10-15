import { Model, ModelCtor } from 'sequelize';

export type SequelizeRepository<M> = ModelCtor<Model<M>>;
