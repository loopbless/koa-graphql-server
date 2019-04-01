import { Base } from './base';
import { Entity, Column } from 'typeorm';

@Entity('au_client')
export class Client extends Base {
  @Column({
    length: 50,
    unique: true,
    name: 'client_id'
  })
  clientId: string;

  @Column({
    length: 100,
    name: 'client_secret'
  })
  clientSecret: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 100,
    default: 'password'
  })
  grants: string;
}
