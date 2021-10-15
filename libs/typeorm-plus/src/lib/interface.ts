import {
  BulkCreateOptions,
  CreateOptions,
  FindOptions,
  Identifier,
  IncrementDecrementOptions,
  IncrementDecrementOptionsWithBy,
  ModelType,
  NonNullFindOptions
} from 'sequelize';

export interface SequelizeRepository<M> extends ModelType<M> {
  findAll(options?: FindOptions): Promise<M[]>;
  findByPk(identifier?: Identifier, options?: Omit<FindOptions | NonNullFindOptions, 'where'>): Promise<M | null>;

  findOne(options?: FindOptions): Promise<M | null>;
  findOne(options: NonNullFindOptions): Promise<M>;

  create(values?: any, options?: CreateOptions): Promise<M>;
  create(values: any, options: CreateOptions & { returning: false }): Promise<void>;

  bulkCreate(records: any[], options?: BulkCreateOptions): Promise<M[]>;

  increment(field: string | string[], options: IncrementDecrementOptionsWithBy): Promise<M>;
  increment(fields: { [key: string]: number }, options: IncrementDecrementOptions): Promise<M>;
}
