import { Client } from '../entities/client';
import { getRepository } from 'typeorm';
import { Base } from './base';

export class ClientDao extends Base<Client> {
  async getByClient(clientId: string, clientSecret: string): Promise<any> {
    return await getRepository(Client)
      .createQueryBuilder('client')
      .where(
        `client.clientId = :clientId and client.clientSecret = :clientSecret and client.status = 1`,
        { clientId, clientSecret }
      )
      .select('client.grants')
      .getOne()
      .then(data => {
        return { ...data, grants: data.grants.split(',') };
      });
  }
}
