import { EntitySchema } from 'typeorm';
import { User } from './user';
import { Client } from './client';
import { Posts } from './posts';
import { Tag } from './tag';
import { Star } from './star';
import { Comment } from './comment';

export const entities: any[] = [
    User,
    Client,
    Posts,
    Tag,
    Star,
    Comment
];