import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum SampleEnum {
  ONE = 'one',
  TWO = 'two'
}

@Entity('postgres_type')
export class PostgresType {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  boolean!: Boolean;

  @Column({ length: '32' })
  shortText!: string;

  @Column()
  number!: number;

  @Column('int')
  int!: number;

  @Column('smallint')
  smallint!: number;

  @Column('bigint')
  bigint!: number;

  @Column()
  date!: Date;

  @Column('date')
  date2!: Date;

  @Column('timestamptz')
  timestamptz!: Date;

  @Column('time')
  time!: Date;

  @Column('boolean')
  isBoolean!: boolean;

  @Column('boolean')
  isSecondBoolean!: boolean;

  @Column('jsonb')
  jsonb: any;

  @Column('json')
  json: any;

  @Column('enum', { enum: SampleEnum })
  enum!: SampleEnum;

  @Column('character varying')
  characterVarying!: string[];

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
