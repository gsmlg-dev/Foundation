import { createSlice } from "@reduxjs/toolkit";
import { filter, map, delay } from "rxjs/operators";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'store';

const counterSlice = createSlice({
  name: "observable/counter",
  initialState: 0,
  reducers: {
    incress: (state, action) => state + action.payload,
  },
});

export default counterSlice;

export const epic = action$ => {
  return action$.pipe(
      filter(counterSlice.actions.incress.match),
      delay(1000),
      // map((action) => console.log(action))
  );
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useIncress = () => {
  const dispatch = useDispatch<AppDispatch>();
  return () => dispatch(counterSlice.actions.incress(1));
};

export const useCounterValue = () => useSelector((state : RootState) => state[counterSlice.name]);
