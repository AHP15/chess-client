import React, {
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore
} from 'react';


const StoreContext = React.createContext(null);


export const useStore = (selector) => {
  const {globalState, set, subscribe} = useContext(StoreContext);
  return {[selector(globalState)]: selector(globalState), set, subscribe};
};


const intialState = {test: 'test', error: 'error'};
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
    subscribers.forEach(callback => callback());
  }, []);

  const globalState = useSyncExternalStore(subscribe, get);

  const value = { globalState, set, subscribe };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};