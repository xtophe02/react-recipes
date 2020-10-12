import React from 'react';
import { capitalize } from '../../src/capitalize';
import { ButtonsSubmit } from '../Buttons/ButtonsSubmit';
import { RecipeInput } from './RecipeInput';

export const AddRecipe = ({
  values,
  handleChange,
  handleSubmit,
  loading,
  isValid,
}) => {
  const { name, category, description, instructions } = values;

  return (
    <div className='columns is-centered'>
      <div className='column is-8'>
        <div className='field'>
          <label className='label'>Category</label>
          <div className='select'>
            <select name='category' onChange={handleChange}>
              {['breakfast', 'lunch', 'dinner', 'snack', 'sandwichs'].map(
                (cat) => (
                  <option key={cat} value={cat}>
                    {capitalize(cat)}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <RecipeInput name='name' value={name} handleChange={handleChange} />

        <RecipeInput
          name='description'
          value={description}
          handleChange={handleChange}
        />
        <RecipeInput
          name='instructions'
          value={instructions}
          handleChange={handleChange}
        />
        <ButtonsSubmit
          handleSubmit={handleSubmit}
          loading={loading}
          isValid={isValid}
        />
      </div>
    </div>
  );
};
