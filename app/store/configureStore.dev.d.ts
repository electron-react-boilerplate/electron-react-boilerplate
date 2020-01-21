/// <reference types="connected-react-router" />
import { counterStateType } from '../reducers/types';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (obj: Record<string, any>) => Function;
    }
    interface NodeModule {
        hot?: {
            accept: (path: string, cb: () => void) => void;
        };
    }
}
declare const _default: {
    configureStore: (initialState?: counterStateType | undefined) => import("redux").Store<import("redux").CombinedState<{
        router: import("connected-react-router").RouterState<{} | null | undefined>;
        counter: number;
    }>, import("redux").AnyAction>;
    history: import("history").History<{} | null | undefined>;
};
export default _default;
//# sourceMappingURL=configureStore.dev.d.ts.map