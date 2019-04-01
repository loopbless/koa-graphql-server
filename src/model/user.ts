import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user';
import { Base } from './base';

export class UserDao extends Base<User> {
  async getByName(username: string, password: string) {
    return await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username and user.password = :password and user.status = 1', {
        username,
        password
      })
      .select(['user.id', 'user.username', 'user.email', 'user.avatar'])
      .getOne();
  }

  async get(id: number) {
    return await getRepository(User).findOne({ id });
  }

  async list(offset: number, limit: number) {
    return await getRepository(User)
      .createQueryBuilder()
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }
}
