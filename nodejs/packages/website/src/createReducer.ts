/**
 * Combine all reducers in this file and export the combined reducers.
 */
 import {
  combineReducers,
} from "@reduxjs/toolkit";

// import reducers start
import counterSlice from 'slices/counter';
// import reducers end

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    // combine reducers start
    [counterSlice.name]: counterSlice.reducer,
    // combine reducers end
    ...injectedReducers,
  });

  return rootReducer;
}
