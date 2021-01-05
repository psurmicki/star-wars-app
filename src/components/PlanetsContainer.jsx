import React, { useEffect, useState } from 'react';
import Loader from './Loader.jsx';
import PlanetsTable from './PlanetsTable.jsx';
import { useData } from '../utils/useData.jsx';
import { get } from 'lodash';
import PropTypes from 'prop-types';

const PlanetsContainer = ({ movie }) => {
  const [path, setPath] = useState(null);
  const { data, isLoading } = useData(path);

  useEffect(() => {
    const handlePlanetsData = () => {
      let planet = get(movie, 'planets', null)
      setPath(planet)
    }
    handlePlanetsData()
  }, [movie])

  return (
    <div>
      {isLoading ?
        <Loader /> :
        data &&
        <PlanetsTable data={data} />
      }
    </div>
  )

}

PlanetsContainer.propTypes = {
  movie: PropTypes.shape({
    planets: PropTypes.array
  })
}

export default PlanetsContainer;