import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from './post.entity';

@Entity()
export class PostImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Post,
    _ => _.images
  )
  posts: Post[];
}
