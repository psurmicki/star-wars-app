import React, { useEffect, useState } from 'react';
import { useData } from '../utils/useData.jsx';
import MovieList from './MovieList.jsx';
import Loader from './Loader.jsx';
import '../styles/MovieContainer.scss';

const MovieContainer = () => {
  const [path, setPath] = useState('');
  const { data, isLoading } = useData(path);

  useEffect(() => {
    setPath('http://swapi.dev/api/films/');
  }, [path])

  return (
    <div className='MovieContainer-Container'>
      {isLoading ?
        <Loader />
        :
        data &&
        <MovieList movies={data.results} />
      }
    </div>
  )
}

export default MovieContainer;