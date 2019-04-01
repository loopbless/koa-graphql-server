import { EntitySchema } from 'typeorm';
import { User } from './user';
import { Client } from './client';

export const entities: any[] = [
    User,
    Client,
];