import React, {
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore
} from 'react';


const StoreContext = React.createContext(null);


export const useStore = (partial) => {
  const { get, set, subscribe } = useContext(StoreContext);
  const partialState = useSyncExternalStore(subscribe, () => get()[partial]);
  return { [partial]: partialState, set };
};


const intialState = {
  user: {
    signedIn: false,
    info: null,
    userPending: false,
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


  const value = { get, set, subscribe };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};