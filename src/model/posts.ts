import { getRepository, Repository } from 'typeorm';
import { Base } from './base';
import { Posts } from '../entities/posts';
import { User } from '../entities/user';

export class PostsDao extends Base<Posts> {
  async get(id: number) {
    return await getRepository(Posts)
      .createQueryBuilder('posts')
      .leftJoinAndMapOne(
        'posts.user',
        'au_user',
        'user',
        'user.id = posts.createBy'
      )
      .where('posts.id = :id', { id })
      .getOne();
  }

  async list(offset: number, limit: number) {
    const results = await getRepository(Posts)
      .createQueryBuilder('posts')
      .leftJoinAndMapOne(
        'posts.user',
        'au_user',
        'user',
        'user.id = posts.createBy'
      )
      .offset(offset)
      .limit(limit)
      .getMany();
    const totals = await getRepository(Posts)
      .createQueryBuilder()
      .getCount();
    return { totals: totals, results: results };
  }
}
