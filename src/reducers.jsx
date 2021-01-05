export function apiReducer(state, action) {
  switch (action.type) {
    case 'FETCHING_DATA':
      return {
        data: null,
        isLoading: true,
        error: null
      };
    case 'FETCHED_SUCCESS':
      return {
        data: action.payload,
        isLoading: false,
        error: null
      };
    case 'FETCHED_FAILED':
      return {
        data: null,
        isLoading: false,
        error: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function movieReducers(state, action) {
  switch (action.type) {
    case 'SET_MOVIE_LIST':
      return {
        ...state,
        moviesList: action.payload
      };
    case 'ADD_OWN_MOVIE':
      return {
        ...state,
        moviesList: [...state.moviesList, ...action.payload]
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
