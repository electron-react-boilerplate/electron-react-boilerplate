// flow-typed signature: 9d088823bcd630e6c765155b9a62a98b
// flow-typed version: 94e9f7e0a4/chai_v3.5.x/flow_>=v0.24.0

/* @flow */
declare module "chai" {

    declare type ExpectChain<T> = {
        and: ExpectChain<T>,
        at: ExpectChain<T>,
        be: ExpectChain<T>,
        been: ExpectChain<T>,
        have: ExpectChain<T>,
        has: ExpectChain<T>,
        is: ExpectChain<T>,
        of: ExpectChain<T>,
        same: ExpectChain<T>,
        that: ExpectChain<T>,
        to: ExpectChain<T>,
        which: ExpectChain<T>,
        with: ExpectChain<T>,

        not: ExpectChain<T>,
        deep: ExpectChain<T>,
        any: ExpectChain<T>,
        all: ExpectChain<T>,

        a: ExpectChain<T> & (type: string) => ExpectChain<T>,
        an: ExpectChain<T> & (type: string) => ExpectChain<T>,

        include: ExpectChain<T> & (value: mixed) => ExpectChain<T>,
        includes: ExpectChain<T> & (value: mixed) => ExpectChain<T>,
        contain: ExpectChain<T> & (value: mixed) => ExpectChain<T>,
        contains: ExpectChain<T> & (value: mixed) => ExpectChain<T>,

        eql: (value: T) => ExpectChain<T>,
        equal: (value: T) => ExpectChain<T>,
        equals: (value: T) => ExpectChain<T>,

        above: (value: T & number) => ExpectChain<T>,
        least: (value: T & number) => ExpectChain<T>,
        below: (value: T & number) => ExpectChain<T>,
        most: (value: T & number) => ExpectChain<T>,
        within: (start: T & number, finish: T & number) => ExpectChain<T>,

        instanceof: (constructor: mixed) => ExpectChain<T>,
        property: (
          <P>(name: string, value?: P) => ExpectChain<P>
          & (name: string) => ExpectChain<mixed>
        ),

        length: ExpectChain<number>,
        lengthOf: (value: number) => ExpectChain<T>,

        match: (regex: RegExp) => ExpectChain<T>,
        string: (string: string) => ExpectChain<T>,

        key: (key: string) => ExpectChain<T>,
        keys: (key: string | Array<string>, ...keys: Array<string>) => ExpectChain<T>,

        throw: <E>(err: Class<E> | Error | RegExp | string, msg?: RegExp | string) => ExpectChain<T>,

        respondTo: (method: string) => ExpectChain<T>,
        itself: ExpectChain<T>,

        satisfy: (method: (value: T) => bool) => ExpectChain<T>,

        closeTo: (expected: T & number, delta: number) => ExpectChain<T>,

        members: (set: mixed) => ExpectChain<T>,
        oneOf: (list: Array<T>) => ExpectChain<T>,

        change: (obj: mixed, key: string) => ExpectChain<T>,
        increase: (obj: mixed, key: string) => ExpectChain<T>,
        decrease: (obj: mixed, key: string) => ExpectChain<T>,

        // dirty-chai
        ok: () => ExpectChain<T>,
        true: () => ExpectChain<T>,
        false: () => ExpectChain<T>,
        null: () => ExpectChain<T>,
        undefined: () => ExpectChain<T>,
        exist: () => ExpectChain<T>,
        empty: () => ExpectChain<T>,

        // chai-immutable
        size: (n: number) => ExpectChain<T>,

        // sinon-chai
        called: () => ExpectChain<T>,
        callCount: (n: number) => ExpectChain<T>,
        calledOnce: () => ExpectChain<T>,
        calledBefore: (spy: mixed) => ExpectChain<T>,
        calledAfter: (spy: mixed) => ExpectChain<T>,
        calledWith: (...args: Array<mixed>) => ExpectChain<T>,
        calledWithMatch: (...args: Array<mixed>) => ExpectChain<T>,
        calledWithExactly: (...args: Array<mixed>) => ExpectChain<T>,
    };

    declare function expect<T>(actual: T): ExpectChain<T>;

    declare function use(plugin: (chai: Object, utils: Object) => void): void;

    declare var config: {
        includeStack: boolean,
        showDiff: boolean,
        truncateThreshold: boolean
    };
}
