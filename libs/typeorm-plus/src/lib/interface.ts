import type {
  AggregateOptions,
  BuildOptions,
  BulkCreateOptions,
  CountOptions,
  CountWithOptions,
  CreateOptions,
  DataType,
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  FindOrCreateOptions,
  GroupOption,
  Identifier,
  IncrementDecrementOptions,
  IncrementDecrementOptionsWithBy,
  ModelType,
  NonNullFindOptions,
  RestoreOptions,
  TruncateOptions,
  UpdateOptions,
  UpsertOptions
} from 'sequelize';

import type { Col, Fn, Literal } from 'sequelize/types/lib/utils';

export interface SequelizeRepository<Model> extends ModelType<Model> {
  findAll<M extends Model>(options?: FindOptions<M>): Promise<M[]>;
  findByPk<M extends Model>(
    identifier?: Identifier,
    options?: Omit<FindOptions | NonNullFindOptions, 'where'>
  ): Promise<M | null>;

  findOne<M extends Model>(options?: FindOptions<Model>): Promise<M | null>;
  findOne<M extends Model>(options: NonNullFindOptions<Model>): Promise<M>;

  aggregate<T, M extends Model>(
    fileld: keyof Model | '*',
    aggregateFunction: string,
    options?: AggregateOptions<T, M>
  ): Promise<T>;

  count<M extends Model>(options: CountWithOptions<M> | CountOptions<M>): Promise<{ [key: string]: number }>;

  findAndCountAll<M extends Model>(
    options: FindAndCountOptions<M> & { group: GroupOption }
  ): Promise<{ rows: M[]; count: number[] }>;

  findAndCountAll<M extends Model>(options: FindAndCountOptions<M>): Promise<{ rows: M[]; count: number }>;

  max<T extends DataType | unknown, M extends Model>(field: keyof M, options?: AggregateOptions<T, M>): Promise<T>;
  min<T extends DataType | unknown, M extends Model>(field: keyof M, options?: AggregateOptions<T, M>): Promise<T>;
  sum<T extends DataType | unknown, M extends Model>(field: keyof M, options?: AggregateOptions<T, M>): Promise<number>;

  build<M extends Model>(record?: M, options?: BuildOptions): M;
  bulkBuild<M extends Model>(record?: ReadonlyArray<M>, options?: BuildOptions): M[];

  create<M extends Model, O extends CreateOptions<M> = CreateOptions<M>>(
    values?: M,
    options?: O
  ): Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : M>;

  findOrBuild<M extends Model>(options: FindOrCreateOptions<M>): Promise<[M, boolean]>;
  findOrCreate<M extends Model>(options: FindOrCreateOptions<M>): Promise<[M, boolean]>;
  findCreateFind<M extends Model>(options: FindOrCreateOptions<M>): Promise<[M, boolean]>;

  upsert<M extends Model>(values: M, options: UpsertOptions<M>): Promise<[M, boolean | null]>;

  bulkCreate<M extends Model>(records: ReadonlyArray<M>, options?: BulkCreateOptions<M>): Promise<M[]>;
  truncate<M extends Model>(options?: TruncateOptions<M>): Promise<void>;

  destroy<M extends Model>(options?: DestroyOptions<M>): Promise<number>;
  restore<M extends Model>(options?: RestoreOptions<M>): Promise<void>;

  update<M extends Model>(
    values: {
      [key in keyof M]?: M[key] | Fn | Col | Literal;
    },
    options: UpdateOptions<M>
  ): Promise<[number, M[]]>;

  increment<M extends Model>(
    field: keyof M | ReadonlyArray<keyof M>,
    options: IncrementDecrementOptionsWithBy<M>
  ): Promise<M>;

  increment<M extends Model>(fields: { [key in keyof M]?: number }, options: IncrementDecrementOptions<M>): Promise<M>;

  describe(): Promise<Record<string, unknown>>;
}
