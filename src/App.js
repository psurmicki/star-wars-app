import React from 'react';
import Header from '../src/components/Header.jsx';
import MovieContainer from '../src/components/MovieContainer.jsx';
import Store from './store.jsx';
import '../src/styles/App.scss';

const App = () => {
  return (
    <Store>
      <div className='App-backgroundImage'>
        <Header />
        <MovieContainer />
      </div>
    </Store>
  );
}

export default App;
