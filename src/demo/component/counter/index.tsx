import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState, decrement, increment} from "../../store";

export function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div>
            <button onClick={() => dispatch(increment())}>
                Increment
            </button>
            <span style={{color: "white"}}>{count}</span>
            <button onClick={() => dispatch(decrement())}>
                Decrement
            </button>
        </div>
    )
}
