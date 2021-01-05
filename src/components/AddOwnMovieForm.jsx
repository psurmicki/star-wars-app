import React, { useContext } from 'react';
import { Button, Input } from 'reactstrap';
import Select from 'react-select';
import { Context } from '../store.jsx';
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import '../styles/AddOwnMovieForm.scss'

const AddOwnMovieForm = ({ planets }) => {
  const [, dispatch] = useContext(Context);
  const { control, errors, handleSubmit, register, reset } = useForm();

  const onSubmit = (data) => {
    let planets = get(data, 'planets', null)
    let planetsUrls = planets.map(({ value }) => value)
    let payload = [{ title: data.title, planets: planetsUrls }]
    dispatch({ type: 'ADD_OWN_MOVIE', payload });
    reset()
  }

  const setSelectOptions = (planets) => {
    return (
      planets.map(
        (planet, i) => ({
          id: `${planet.name}-${i}`,
          value: planet.url,
          label: planet.name
        })
      )
    )
  }

  return (
    <form
      className='FormContainer'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="title">Movie Title</label>
        <Input
          name='title'
          type='text'
          placeholder='Enter Movie Title...'
          innerRef={register({
            required: 'Title is required!',
            minLength: {
              value: 3,
              message: 'Title is too short...'
            },
            validate: (value) => {
              return /[A-Z]/.test(value[0]) || 'Title must start with capital letter!'
            }
          })}
        />
        <ErrorMessage
          errors={errors}
          name="title"
          as='div'
          style={{ color: 'red' }}
        >
          {({ messages }) =>
            messages &&
            Object.entries(messages).map(
              ([type, message]) => (
                <div>
                  <p key={type}>
                    {message}
                  </p>
                </div>
              )
            )
          }
        </ErrorMessage>
      </div>
      <div className='FormSelect'>
        <label htmlFor='planets'>Select Planets</label>
        <Controller
          control={control}
          name="planets"
          defaultValue=''
          rules={{
            required: 'Please select at least one planet!',
            minLength: {
              value: 1,
              message: 'Please select at least one planet!'
            },
          }}
          as={
            <Select
              className="basic-multi-select"
              classNamePrefix="Select"
              placeholder='Select planets...'
              options={setSelectOptions(planets)}
              isClearable
              isMulti
            />
          }
        />
        <ErrorMessage
          errors={errors}
          name="planets"
          as='div'
          style={{ color: 'red' }}
        >
          {({ messages }) =>
            messages &&
            Object.entries(messages).map(
              ([type, message]) => (
                <div>
                  <p key={type}>
                    {message}
                  </p>
                </div>
              )
            )
          }
        </ErrorMessage>
      </div>
      <div className='FormAddMovieButton'>
        <Button
          color="success"
          children={'Add Movie'}
        />
      </div>
    </form>
  );

}

AddOwnMovieForm.propTypes = {
  planets: PropTypes.array
}

export default AddOwnMovieForm;