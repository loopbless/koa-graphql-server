import { Entity, Column } from 'typeorm';
import { Base } from './base';

@Entity('tp_comment')
export class Comment extends Base {
  @Column({
    length: 200
  })
  content: string;

  @Column({
    nullable: true
  })
  replayId: number;
}
