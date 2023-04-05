
export function hasOwnProperty<X extends object, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function hasOwnProperty<T, K extends PropertyKey>(
    obj: T,
    prop: K
): obj is T & Record<K, unknown> {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function getObjectFromProperty<T, K extends PropertyKey, U extends object>(
    obj: T,
    prop: K
): U | undefined {
    if (Object.prototype.hasOwnProperty.call(obj, prop) &&
        typeof obj[(prop as unknown) as keyof T] !== 'object') {
        return obj[(prop as unknown) as keyof T] as U;
    }
}
