import * as util from 'util';
import { redis } from '../config/db';
import { UserDao } from './user';
import { User, Client, Token, RefreshToken } from 'oauth2-server';
import { ClientDao } from './client';

const fmt = util.format;

/**
 * Redis formats.
 */
const formats = {
  client: 'clients:%s',
  token: 'tokens:%s',
  user: 'users:%s'
};

/**
 * 获取token
 * @param {string} bearerToken - 承载令牌
 * @returns {Promise<Token>}
 */
export async function getAccessToken(bearerToken: string): Promise<Token> {
  let token: any = await redis.hgetall(fmt(formats.token, bearerToken));
  if (!token) {
    return;
  }
  return {
    accessToken: token.accessToken,
    expires: token.accessTokenExpiresOn,
    client: null,
    user: token.user
  };
}

/**
 * 获取客户端信息
 * @param {string} clientId - 客户端ID
 * @param {string} clientSecret - 客户端密码
 */
export async function getClient(
  clientId: string,
  clientSecret: string
): Promise<Client> {
  return await new ClientDao().getByClient(clientId, clientSecret);
}

/**
 * 获取RefreshToken
 * @param {string} refreshToken - 刷新token
 */
export async function getRefreshToken(
  refreshToken: string
): Promise<RefreshToken> {
  let token: any = await redis.hgetall(fmt(formats.token, refreshToken));
  if (!token) {
    return;
  }
  return {
    client: null,
    expires: token.refreshTokenExpiresOn,
    refreshToken: token.accessToken,
    user: token.user
  };
}

/**
 * 获取用户
 * @param {string} username - 用户名
 * @param {string} password - 密码
 */
export async function getUser(username: string, password: string) {
  var user = await new UserDao().getByName(username, password);
  if (!user) {
    return;
  }
  return {
    ...user
  };
}

/**
 * 验证作用范围
 * @param {Token} token - token
 * @param {string | string[]} scope - 作用范围
 */
export async function verifyScope(
  token: Token,
  scope: string | string[]
): Promise<boolean> {
  return true;
}

/**
 * 存储token、客户端和用户信息
 * @param {Token} token - token
 * @param {Client} client - 客户端
 * @param {User} user - 用户
 */
export async function saveToken(
  token: Token,
  client: Client,
  user: User
): Promise<Token> {
  const data: any = {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt
  };
  await redis.hmset(fmt(formats.token, token.accessToken), data);
  await redis.expire(
    fmt(formats.token, token.accessToken),
    expireTimehandler(token.accessTokenExpiresAt)
  );
  await redis.hmset(fmt(formats.user, token.accessToken), user);
  await redis.expire(
    fmt(formats.user, token.accessToken),
    expireTimehandler(token.refreshTokenExpiresAt)
  );
  return { ...data, user, client };
}

/**
 * 计算过期时长
 * @param {Date} time 过期时间
 */
function expireTimehandler(time: Date) {
  const betweenTime = time.getTime() - new Date().getTime();
  return parseInt((betweenTime / 1000).toFixed(0));
}
