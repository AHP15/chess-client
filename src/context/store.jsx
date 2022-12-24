import React, {
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore
} from 'react';

import { getUser } from '../api/user';


const StoreContext = React.createContext(null);


export const useStore = (partial) => {
  const { get, set, clearAlert, subscribe } = useContext(StoreContext);
  const partialState = useSyncExternalStore(subscribe, () => get()[partial]);
  return { [partial]: partialState, set, clearAlert };
};


const intialState = {
  user: {
    signedIn: false,
    info: null,
    userPending: false,
  },
  alertMessage: {
    type: null,
    message: null,
  },
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

  // If the user already signedIn
  if(localStorage.getItem('chess-user')) {
    set({
      user: {
        info: null,
        signedIn: true,
        userPending: true,
      }
    });

    getUser().then(response => {
      if (response.success) {
        set({
          user: {
            info: response.user,
            signedIn: true,
            userPending: false,
          }
        });
      } else {
        set({
          user: {
            info: null,
            signedIn: false,
            userPending: false,
          },
          alertMessage: {
            type: 'error',
            message: response.error,
          }
        });
        localStorage.removeItem('chess-user')
      }
    });
  }


  const value = { get, set, clearAlert, subscribe };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};