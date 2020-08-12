import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Profile } from './profile.entity';

@Entity('one_to_one_user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile?: Profile;
  @Column({ nullable: true })
  profileId?: number;
}
