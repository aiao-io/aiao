import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('one_to_one_profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  gender!: string;
}
