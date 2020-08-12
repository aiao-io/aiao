import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from './post.entity';

@Entity('many_to_many_image')
export class PostImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Post, _ => _.images)
  posts!: Post[];
}
