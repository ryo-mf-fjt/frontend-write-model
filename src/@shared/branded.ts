declare const __brand: unique symbol;

export type Branded<T, B> = T & { __brand: B };

export const Branded = <T, B>(value: T): Branded<T, B> =>
  value as Branded<T, B>;
