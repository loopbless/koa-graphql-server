import * as KRouter from 'koa-router';
import { Context } from 'koa';

export const ROUTES: { [controller: string]: { [method: string]: Route } } = {};

export enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export interface Router {
  path: string;
  method: Method;
}

interface Route extends Router {
  params?: { [key: string]: number } | number;
  function: Function;
}

const controllerPath = Symbol('controllerPath');

export function Router(router: string | Router): ClassDecorator {
  return (target: any) => {
    if (typeof target === 'function') {
      target.prototype[controllerPath] = router;
    }
  };
}

export function Autowired(entity: any): PropertyDecorator {
  return (target: any, key: string) => {
    new Promise(resolve => resolve()).then(() => {
      target[key] = new entity();
    });
  };
}

function setValue(controller: string, method: string, value: any) {
  if (!ROUTES[controller]) {
    (<any>ROUTES)[controller] = {};
  }
  const route = (<any>ROUTES)[controller];
  if (typeof value === 'function') {
    route[method] = route[method] || {};
    value(route, method).then((routValue: any) => {
      route[method] = routValue;
    });
  } else {
    route[method] = { ...route[method], ...value };
  }
}

export function Params(paramKey: string): ParameterDecorator {
  return function(target: any, methodKey: string, paramIndex: number) {
    new Promise(resolve => resolve()).then(() => {
      const params = 'params';
      setValue(
        target.constructor.name,
        methodKey,
        async (route: any, method: string) => {
          if (paramKey) {
            if (!route[method][params]) {
              route[method][params] = {};
            }
            route[method][params][paramKey] = paramIndex;
          } else {
            if (!route[method][params]) {
              route[method][params] = paramIndex;
            } else {
              throw Error('@Params 在同一个方法上只能使用一次！');
            }
          }
          return await route;
        }
      );
    });
  };
}

export function GET(path: string): MethodDecorator {
  return (target: any, methodKey: string, descriptor: any) => {
    new Promise(resolve => resolve()).then(() => {
      if (typeof target === 'object') {
        const routerUri = `${target[controllerPath]}/${path}`;
        setValue(target.constructor.name, methodKey, {
          path: routerUri.replace(/\/\/+/g, '/'),
          method: Method.GET,
          function: descriptor.value as Function
        });
      }
    });
  };
}

export class KoaRouter extends KRouter {
  constructor() {
    super();
  }

  controllers(controllers: any[]) {
    new Promise(resolve => resolve()).then(() => {
      controllers.forEach(controller => {
        const methods = ROUTES[controller.name];
        for (let method in methods) {
          const route = methods[method];
          (<any>this)[route.method.toLocaleLowerCase()](
            route.path,
            async (ctx: Context) => {
              const args: any[] = [];
              if (typeof route.params === 'object') {
                for (let key in route.params) {
                  args[route.params[key]] = ctx.params[key];
                }
              } else {
                args[route.params] = ctx.params;
              }
              ctx.body = await route.function.apply(controller.prototype, args);
            }
          );
        }
      });
    });
    return this.routes();
  }
}
