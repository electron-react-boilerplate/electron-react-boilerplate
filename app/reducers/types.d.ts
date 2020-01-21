import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
export declare type counterStateType = {
    counter: number;
};
export declare type GetState = () => counterStateType;
export declare type Dispatch = ReduxDispatch<Action<string>>;
export declare type Store = ReduxStore<counterStateType, Action<string>>;
//# sourceMappingURL=types.d.ts.map