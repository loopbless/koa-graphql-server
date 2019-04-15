import { Entity, Column } from 'typeorm';
import { Base } from './base';
import { User } from './user';

@Entity('tp_posts')
export class Posts extends Base {
  @Column({
    length: 200,
    charset: 'utf8'
  })
  title: string;

  @Column({
    type: 'longtext',
    charset: 'utf8'
  })
  content: string;

  @Column({
    type: 'tinyint',
    default: 1
  })
  isPublish: 1 | 0;

  @Column({
    type: 'datetime'
  })
  updateAt: Date;

  user: User;
}
