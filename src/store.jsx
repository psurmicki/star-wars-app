import React, { createContext, useReducer } from "react";
import { movieReducers } from './reducers.jsx';

const initialState = {
  moviesList: [],
  error: null
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducers, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

export const Context = createContext(initialState);

export default Store;