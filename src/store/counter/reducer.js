import {action} from './action'
const  initState = {
    count: 0,
}
const CounterReducer = (initState, action) => {
    switch (action.type) {
        case 'add':
            return {count: initState.count+1}
            break;
        case 'reduce':
                return {count: initState.count-1}
            break;
        default:
            return initState===undefined?{} :initState;

    }
}
export {CounterReducer}
