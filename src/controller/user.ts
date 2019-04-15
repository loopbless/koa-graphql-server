import { Router, Params, Get, Autowired } from '../core/router';
import { getRepository } from 'typeorm';
import { User } from '../entities/user';
import { UserDao } from '../model/user';

@Router('/users')
export class UserController {

  @Autowired(UserDao)
  private user: UserDao;

  @Get(':id')
  async get(@Params('id') id: string) {
    try {
      const userId = parseInt(id);
      return this.user.get(userId);
    } catch (error) {
      return error;
    }
  }

  @Get('')
  async list() {
    return await this.user.list(0, 2);
  }
}
