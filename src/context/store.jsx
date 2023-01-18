import React, {
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore
} from 'react';

import { fetchData } from '../api/fetch';

const StoreContext = React.createContext(null);


export const useStore = (partial = null) => {
  const { get, set, clearAlert, subscribe } = useContext(StoreContext);

  if (!partial) {
    const globalState = useSyncExternalStore(subscribe, () => get());
    return { globalState, set, clearAlert };
  }
  const partialState = useSyncExternalStore(subscribe, () => get()[partial]);
  return { [partial]: partialState, set, clearAlert };
};


const intialState = {
  user: {
    info: null,
    userPending: localStorage.getItem('token')? true : false,
  },
  alertMessage: {
    type: null,
    message: null,
  },
  formModel: {
    show: false,
    of: null,
  },
  socket: null,
  challenge: {
    by: {
      email: null,
      playAs: null,
    },
    to: {
      email: null,
      playAs: null,
    },
    time: null,
    accepted: false,
  },
  friendChellenged: null,
  gameInfo: JSON.parse(localStorage.getItem('gameInfo')) ?? {
    player: null,
    time: null,
  }
};
export const StoreProvider = ({children}) => {
  const store = useRef(intialState);

  // I can use an array as a value for the ref
  // but I will find myself adding the same subscriber multiple time
  // so I have to remove it which add more complexity.
  // In Set class I can add an element only one time, that's why i use it here :)
  const subscribers = useRef(new Set());
  const subscribe = useCallback((callback) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  const get = useCallback(() => store.current, []);
  const set = useCallback((data) => {
    store.current = { ...store.current, ...data };
    subscribers.current.forEach(callback => callback());
  }, []);
  const clearAlert = useCallback(() => {
    set({
      alertMessage: {
        type: null,
        message: null,
      },
    });
  }, []);

  const value = { get, set, clearAlert, subscribe };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};