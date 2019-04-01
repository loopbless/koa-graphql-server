import { Router, Params, GET, Autowired } from '../core/router';
// import { get, list } from '../model/user';
import { getRepository } from 'typeorm';
import { User } from '../entities/user';
import { UserDao } from '../model/user';

@Router('/user')
export class UserController {

  @Autowired(UserDao)
  private user: UserDao;

  @GET(':id')
  async get(@Params('id') id: string) {
    try {
      const userId = parseInt(id);
      return this.user.get(userId);
    } catch (error) {
      return error;
    }
  }

  @GET('')
  async list() {
    return await this.user.list(0, 2);
  }
}
