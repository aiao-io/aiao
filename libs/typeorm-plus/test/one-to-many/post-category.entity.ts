import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from './post.entity';

@Entity('one_to_many_post_category')
export class PostCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Post, _ => _.category)
  posts!: Post[];
}
