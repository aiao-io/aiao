import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PostCategory } from './post-category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @ManyToOne(() => PostCategory, _ => _.posts, { cascade: true })
  @JoinColumn()
  category?: PostCategory;
  @Column({ nullable: true })
  categoryId?: number;
}
