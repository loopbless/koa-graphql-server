import { PrimaryGeneratedColumn, Column } from 'typeorm';
export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'create_by'
  })
  createBy: number;

  @Column({
    type: Date,
    name: 'create_at'
  })
  createdAt: Date;

  @Column({
    type: 'tinyint',
    default: 1
  })
  status: 1 | 0;
}
