import { useEffect, useReducer } from 'react';
import { apiReducer } from '../reducers.jsx';

const checkStatus = response => response.ok ? Promise.resolve(response) : Promise.reject(new Error(response.statusText))

const parseJSON = response => response.json();

const getMultipleData = url => fetch(url)
  .then(checkStatus)
  .then(parseJSON)
  .catch(error => console.log("There was a problem!", error))

const fetchData = async (path) => {
  if (!path) return;
  let response;
  if (Array.isArray(path)) {
    response = await Promise.all(
      path.map(url => getMultipleData(url))
    )
    return response
  } else {
    response = await fetch(path)
    if (response.ok) {
      return response.json();
    } else throw new Error(response.statusText);
  };
};

export const useData = (path) => {
  const [response, dispatch] = useReducer(apiReducer, { data: null, isLoading: false, error: null });
  useEffect(() => {
    dispatch({ type: 'FETCHING_DATA' });
    fetchData(path)
      .then((data) => dispatch({ type: 'FETCHED_SUCCESS', payload: data }))
      .catch((error) => dispatch({ type: 'FETCHED_FAILED', payload: error }));
  }, [path]);
  return response;
};