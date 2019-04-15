import { UserDao } from '../../model/user';
import { Context } from 'koa';

export const UserQuery = {
  async user(parent: any, { id }: { id: number }, ctx: Context) {
    return await new UserDao().get(id);
  },
  async users(
    parent: any,
    { offset, limit }: { offset: number; limit: number },
    ctx: Context
  ) {
    return await new UserDao().list(offset, limit);
  }
};
