/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import MovieListItem from './MovieListItem.jsx';
import { Container } from 'reactstrap';
import PlanetsContainer from './PlanetsContainer.jsx';
import AddOwnMovieForm from './AddOwnMovieForm.jsx';
import Loader from './Loader.jsx';
import PropTypes from 'prop-types';
import { Context } from '../store.jsx';
import { useData } from '../utils/useData.jsx';
import '../styles/MovieList.scss';

const MovieList = ({ movies }) => {
  const [state, dispatch] = useContext(Context);
  const [path, setPath] = useState(null);
  const { data, isLoading } = useData(path);

  useEffect(() => {
    dispatch({ type: 'SET_MOVIE_LIST', payload: movies });
    setPath('https://swapi.dev/api/planets/');
  }, [movies])

  return (
    <Container
      fluid='md'
      className='MovieListContainer'
    >
      {
        state.moviesList.map(({ title }, index) => {
          return (
            <MovieListItem
              key={`${title}-${index}`}
              ids={title.replace(/\s/g, '-')}
              title={title}
              component={<PlanetsContainer movie={state.moviesList[index]} />}
            />
          )
        })
      }
      {isLoading ?
        <Loader /> :
        data &&
        <MovieListItem
          ids={'Add-Movie'}
          title={'Add Movie'}
          component={<AddOwnMovieForm planets={data.results} />}
        />
      }
    </Container>
  )
}

MovieList.propTypes = {
  movies: PropTypes.array
}

export default MovieList;