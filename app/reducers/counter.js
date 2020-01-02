import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';
export default function counter(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case INCREMENT_COUNTER:
            return state + 1;
        case DECREMENT_COUNTER:
            return state - 1;
        default:
            return state;
    }
}
//# sourceMappingURL=counter.js.map