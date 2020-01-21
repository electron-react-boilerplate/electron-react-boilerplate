/// <reference types="connected-react-router" />
import { History } from 'history';
export default function createRootReducer(history: History): import("redux").Reducer<import("redux").CombinedState<{
    router: import("connected-react-router").RouterState<{} | null | undefined>;
    counter: number;
}>, import("redux").AnyAction>;
//# sourceMappingURL=index.d.ts.map