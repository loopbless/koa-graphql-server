import { Context } from 'koa';
import { PostsDao } from '../../model/posts';

export const PostsQuery = {
  async post(parent: any, { id }: { id: number }, ctx: Context) {
    return await new PostsDao().get(id);
  },
  async posts(
    parent: any,
    { offset, limit }: { offset: number; limit: number },
    ctx: Context
  ) {
    return await new PostsDao().list(offset, limit);
  }
};
