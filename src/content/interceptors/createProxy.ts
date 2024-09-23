/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ProxyOptions<T extends Record<string, any>> {
  constructorCall?(args: unknown[], next: Func<T>): T

  methodCall?<F extends keyof T>(
    this: T,
    data: [methodName: F, args: unknown[]],
    next: Func<void>
  ): void

  setProperty?(
    data: [propertyName: string | symbol, nextValue: unknown],
    next: Func<boolean>
  ): boolean

  getProperty?(
    data: [propertyName: string | symbol, receiver: T],
    next: Func<void>
  ): void
}

export type Func<T> = () => T

export function createProxy<T extends object>(
    target: T,
    options: ProxyOptions<T>
): T {
    const proxy = new Proxy(target, optionsToProxyHandler(options));

    return proxy;
}

function optionsToProxyHandler<T extends Record<string, any>>(
    options: ProxyOptions<T>
): ProxyHandler<T> {
    const { constructorCall, methodCall, getProperty, setProperty } = options;
    const handler: ProxyHandler<T> = {};

    if (typeof constructorCall !== 'undefined') {
        handler.construct = function (target, args, newTarget) {
            const next = Reflect.construct.bind(null, target as any, args, newTarget);
            return constructorCall.call(newTarget, args, next);
        };
    }

    handler.set = function (target, propertyName, nextValue) {
        const next = () => Reflect.set(target, propertyName, nextValue);

        if (typeof setProperty !== 'undefined') {
            return setProperty.call(target, [propertyName, nextValue], next);
        }

        return next();
    };

    handler.get = function (target, propertyName, receiver) {
    /**
     * @note Using `Reflect.get()` here causes "TypeError: Illegal invocation".
     */
        const next = () => target[propertyName as any];

        const value =
      typeof getProperty !== 'undefined'
          ? getProperty.call(target, [propertyName, receiver], next)
          : next();

        if (typeof value === 'function') {
            return (...args: any[]) => {
                const next = value.bind(target, ...args);

                if (typeof methodCall !== 'undefined') {
                    return methodCall.call(target, [propertyName as any, args], next);
                }

                return next();
            };
        }

        return value;
    };

    return handler;
}
