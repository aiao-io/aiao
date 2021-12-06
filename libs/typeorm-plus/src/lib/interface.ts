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
import { DeepPartial, EntitySchema } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-types
export type EntityType = Function | string | EntitySchema<any>;

export interface SequelizeRepository<Model> extends ModelType<Model> {
  findAll<M extends DeepPartial<Model>>(options?: FindOptions<M>): Promise<Model[]>;
  findByPk(identifier?: Identifier, options?: Omit<FindOptions | NonNullFindOptions, 'where'>): Promise<Model | null>;

  findOne(options?: FindOptions<Model>): Promise<Model | null>;
  findOne(options: NonNullFindOptions<Model>): Promise<Model>;

  aggregate<T, M extends DeepPartial<Model>>(
    fileld: keyof Model | '*',
    aggregateFunction: string,
    options?: AggregateOptions<T, M>
  ): Promise<T>;

  count<M extends DeepPartial<Model>>(
    options: CountWithOptions<M> | CountOptions<M>
  ): Promise<{ [key: string]: number }>;

  findAndCountAll<M extends DeepPartial<Model>>(
    options: FindAndCountOptions<M> & { group: GroupOption }
  ): Promise<{ rows: Model[]; count: number[] }>;

  findAndCountAll<M extends DeepPartial<Model>>(
    options: FindAndCountOptions<M>
  ): Promise<{ rows: Model[]; count: number }>;

  max<T extends DataType | unknown, M extends DeepPartial<Model>>(
    field: keyof M,
    options?: AggregateOptions<T, Model>
  ): Promise<T>;
  min<T extends DataType | unknown, M extends DeepPartial<Model>>(
    field: keyof M,
    options?: AggregateOptions<T, Model>
  ): Promise<T>;
  sum<T extends DataType | unknown, M extends DeepPartial<Model>>(
    field: keyof M,
    options?: AggregateOptions<T, Model>
  ): Promise<number>;

  build<M extends DeepPartial<Model>>(record?: M, options?: BuildOptions): Model;
  bulkBuild<M extends DeepPartial<Model>>(record?: ReadonlyArray<M>, options?: BuildOptions): Model[];

  create<M extends DeepPartial<Model>, O extends CreateOptions<M> = CreateOptions<M>>(
    values?: M,
    options?: O
  ): Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : Model>;

  findOrBuild<M extends DeepPartial<Model>>(options: FindOrCreateOptions<M>): Promise<[Model, boolean]>;
  findOrCreate<M extends DeepPartial<Model>>(options: FindOrCreateOptions<M>): Promise<[Model, boolean]>;
  findCreateFind<M extends DeepPartial<Model>>(options: FindOrCreateOptions<M>): Promise<[Model, boolean]>;

  upsert<M extends DeepPartial<Model>>(values: M, options: UpsertOptions<M>): Promise<[Model, boolean | null]>;

  bulkCreate<M extends DeepPartial<Model>>(
    records: ReadonlyArray<M>,
    options?: BulkCreateOptions<Model>
  ): Promise<Model[]>;
  truncate<M extends DeepPartial<Model>>(options?: TruncateOptions<M>): Promise<void>;

  destroy<M extends DeepPartial<Model>>(options?: DestroyOptions<M>): Promise<number>;
  restore<M extends DeepPartial<Model>>(options?: RestoreOptions<M>): Promise<void>;

  update<M extends DeepPartial<Model>>(
    values: {
      [key in keyof M]?: M[key] | Fn | Col | Literal;
    },
    options: UpdateOptions<M>
  ): Promise<[number, Model[]]>;

  increment<M extends DeepPartial<Model>>(
    field: keyof M | ReadonlyArray<keyof M>,
    options: IncrementDecrementOptionsWithBy<M>
  ): Promise<Model>;

  increment<M extends DeepPartial<Model>>(
    fields: { [key in keyof M]?: number },
    options: IncrementDecrementOptions<M>
  ): Promise<Model>;

  describe(): Promise<Record<string, unknown>>;
}
