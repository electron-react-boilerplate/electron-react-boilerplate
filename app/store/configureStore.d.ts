/// <reference types="connected-react-router" />
export declare const configureStore: ((initialState?: import("../reducers/types").counterStateType | undefined) => import("redux").Store<import("redux").CombinedState<{
    router: import("connected-react-router").RouterState<{} | null | undefined>;
    counter: number;
}>, import("redux").AnyAction>) | ((initialState?: import("../reducers/types").counterStateType | undefined) => import("../reducers/types").Store);
export declare const history: import("history").History<{} | null | undefined>;
//# sourceMappingURL=configureStore.d.ts.map