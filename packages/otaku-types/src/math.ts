import type { fill } from "./array"

export type add<number1 extends number, number2 extends number> = [...fill<unknown, number1>, ...fill<unknown, number2>]['length']