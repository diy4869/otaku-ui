/// <reference types="react" />
import { a } from './type';
declare type N = number;
interface B {
    fn: void;
}
export interface Props extends B {
    /**
     * xxxx
     * @zh-cn 中文
     * @en 英语
    */
    a: N;
    b?: string;
    c: boolean;
    d: any;
    f: a;
    size: 'small' | 'middle' | 'large';
    e: (a: number) => void;
}
declare function B({ c, b, d }: {
    c: any;
    b: any;
    d?: number;
}): JSX.Element;
export declare function Test(props: Props): JSX.Element;
export {};
