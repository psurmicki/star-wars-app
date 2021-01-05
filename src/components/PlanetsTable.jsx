import React from 'react';
import { Table } from 'reactstrap';
import { useSortBy, useTable } from "react-table";
import PropTypes from 'prop-types';
import '../styles/PlanetsTable.scss';

const numberComparator = (numb1, numb2) => {
  if (numb1 > numb2 || numb2 == null) {
    return 1;
  } else if (numb1 < numb2 || numb1 == null) {
    return -1;
  } else return 0;
};

const checkNumberValue = (value) => {
  let vals = Number(value)
  return Number.isInteger(vals) ? vals : 0
}

const columns = [
  {
    Header: 'Planet Name',
    accessor: 'name',
    sortType: "basic"
  },
  {
    Header: 'Rotation Period',
    accessor: planet => checkNumberValue(planet.rotation_period),
    sortType: "basic",
    sortMethod: (numb1, numb2) => numberComparator(numb1, numb2)
  },
  {
    Header: 'Orbital Period',
    accessor: planet => checkNumberValue(planet.orbital_period),
    sortType: "basic",
    sortMethod: (numb1, numb2) => numberComparator(numb1, numb2)
  },
  {
    Header: 'Diameter',
    accessor: planet => checkNumberValue(planet.diameter),
    sortType: "basic",
    sortMethod: (numb1, numb2) => numberComparator(numb1, numb2)
  },
  {
    Header: 'Climate',
    accessor: 'climate',
    sortType: "basic"
  },
  {
    Header: 'Surface Water',
    accessor: planet => checkNumberValue(planet.surface_water),
    sortType: "basic",
    sortMethod: (numb1, numb2) => numberComparator(numb1, numb2)
  },
  {
    Header: 'Population',
    accessor: planet => checkNumberValue(planet.population),
    sortType: "basic",
    sortMethod: (numb1, numb2) => numberComparator(numb1, numb2)
  }
]

const PlanetsTable = ({ data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    <Table
      striped
      responsive
      className='Table'
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}{' '}
                {column.isSorted ? (
                  column.isSortedDesc
                    ? <span className="fas fa-caret-down" />
                    : <span className="fas fa-caret-up" />
                )
                  : ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

PlanetsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rotation_period: PropTypes.string,
      orbital_period: PropTypes.string,
      diameter: PropTypes.string,
      climate: PropTypes.string,
      surface_water: PropTypes.string,
      population: PropTypes.string
    })
  )
}

export default PlanetsTable;
