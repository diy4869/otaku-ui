export type shift<T extends unknown[]> = T extends [] ? [] : T extends [unknown, ...infer Rest] ? Rest : never
export type unshift<T extends unknown[], V> = [V, ...T]['length']
export type push<T extends unknown[], V> = [...T, V]['length']
export type pop<T extends unknown[]> = T extends [] ? [] : T extends [...infer Rest, unknown] ? Rest : never

export type First<T extends unknown[]> = T extends [infer First, ...unknown[]] ? First : never

export type getArray<T extends unknown[], index extends number> = T[index]

export type fill<T extends any, count extends number, result extends unknown[] = []> =
  result['length'] extends count ? result : fill<T, count, [T, ...result]>

export type join<T extends unknown[], S extends string> = T extends [infer First extends string | number, ...infer Rest]
  ? Rest extends [] ? `${First}` : `${First}${S}${join<Rest, S>}` : never 

type a = push<[], 1, 2, 3>