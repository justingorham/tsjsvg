export interface Foo<T>{
    bar: T | T[];
}

export type DefaultFoo = Foo<string>;
