import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PostCategory } from './post-category.entity';

@Entity('one_to_many_car')
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => People, { primary: true })
  people?: PostCategory;
}

@Entity('one_to_many_people')
export class People {
  @PrimaryGeneratedColumn()
  id!: number;
}
