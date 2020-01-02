import { ModelType, Model } from 'sequelize';

export type SequelizeRepository<M = Model> = (new () => M) & ModelType;
