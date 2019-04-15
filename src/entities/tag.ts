import { Entity, Column } from 'typeorm';
import { Base } from './base';

@Entity('tp_tag')
export class Tag extends Base {
  @Column({ length: 50 })
  name: string;

  @Column({
    length: 200
  })
  description: string;
}
