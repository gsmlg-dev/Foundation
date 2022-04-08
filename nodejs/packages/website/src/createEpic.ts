/**
 * Combine all reducers in this file and export the combined reducers.
 */

 import { combineEpics } from 'redux-observable';

 // import epics start
 import { epic as counterEpic } from 'slices/counter';
 // import epics end
 
 /**
  * Create root Epic
  */
 export function createEpic(injectedEpics = {}) {
   const rootEpic = combineEpics(
     // combine epics start
     counterEpic,
     // combine epics end
   );
   return rootEpic;
 }
 