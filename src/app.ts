import 'reflect-metadata';
import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as bodyparser from 'koa-bodyparser';
import * as oauth2 from 'oauth2-server';
import * as auth from './model/auth';
import { KoaRouter } from './core/router';
import { UserController } from './controller/user';
import { createDBConnection } from './config/db';

const app: any = new Koa();
const router = new KoaRouter();

app.use(bodyparser());
app.use(logger());
app.use(router.controllers([UserController]));

app.oauth = new oauth2({
  model: auth
});

router.post('/oauth/token', async ctx => {
  ctx.body = await app.oauth.token(
    new oauth2.Request(ctx.request),
    new oauth2.Response(ctx.response)
  );
});

app.listen(8080, async () => {
  await createDBConnection();
});

console.log('Server running on port 8080');
