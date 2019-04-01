import { Base } from './base';
import { Entity, Column } from 'typeorm';

@Entity('au_user')
export class User extends Base {
  @Column({
    length: 100
  })
  email: string;

  @Column({
    length: 50,
  })
  username: string;

  @Column({
    length: 100,
  })
  password: string;

  @Column({
    length: 200,
    nullable: true    
  })
  avatar: string;
}
