import { GetState, Dispatch } from '../reducers/types';
export declare const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export declare const DECREMENT_COUNTER = "DECREMENT_COUNTER";
export declare function increment(): {
    type: string;
};
export declare function decrement(): {
    type: string;
};
export declare function incrementIfOdd(): (dispatch: Dispatch, getState: GetState) => void;
export declare function incrementAsync(delay?: number): (dispatch: Dispatch) => void;
//# sourceMappingURL=counter.d.ts.map