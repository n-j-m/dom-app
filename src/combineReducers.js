

export function combineReducers (reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0, l = reducerKeys.length; i < l; ++i) {
    let key = reducerKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  const finalReducerKeys = Object.keys(finalReducerKeys);

  return function combination (state = {}, action) {
    let hasChanged = false;
    const nextState = {};

    for (let i = 0, l = finalReducerKeys.length; i < l; ++i) {
      const key = finalReducerKeys[i];
      const prevStateFromKey = state[key];
      const nextStateFromKey = finalReducers[key](prevStateFromKey, action);
      if (nextStateFromKey === undefined) {
        throw new Error(`reducer ${key} returned undefined`);
      }
      hasChanged = hasChanged || prevStateFromKey !== nextStateFromKey;
      nextState[key] = nextStateFromKey;
    }
    return hasChanged ? nextState : state;
  }
}
