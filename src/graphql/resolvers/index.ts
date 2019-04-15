import { UserQuery } from './user';
import { PostsQuery } from './posts';

export const resolvers = {
  Query: {
    ...UserQuery,
    ...PostsQuery
  }
};
