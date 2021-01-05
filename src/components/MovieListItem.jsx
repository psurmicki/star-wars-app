import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import '../styles/MovieListItem.scss';

const MovieListItem = ({ title, ids, component }) => {
  const [isActivePanel, setActivePanel] = useState({});

  const toggleItem = (event) => {
    setActivePanel(prevState => ({ ...prevState, [event.target.id]: !prevState[event.target.id] }));
  };

  const toggleIcon = (value) => {
    let caretDirection = value ?
      <span id={ids} className="fas fa-caret-up" /> :
      <span id={ids} className="fas fa-caret-down" />
    return caretDirection
  }

  return (
    <div className='MovieListItem-Container'>
      <div className='MovieListItem-List'>
        <span>{title}</span>
        <Button
          id={ids}
          color='warning'
          style={{ borderRadius: '100%' }}
          onClick={toggleItem}
          children={toggleIcon(isActivePanel[ids])}
        />
      </div>
      <Collapse
        isOpen={isActivePanel[ids]}
      >
        {isActivePanel[ids] && component}
      </Collapse>
    </div>
  )
}

MovieListItem.propTypes = {
  title: PropTypes.string,
  ids: PropTypes.string,
  component: PropTypes.object
}

export default MovieListItem;