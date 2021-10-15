import React  from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useSelector } from 'react-redux';
import AppStateTypes from '../services/types/app-state-types';
import Loader from '../components/loader/loader';
import NotFoundError from './not-found-error';

function IngredientPage() {
  const { ingredientsList, ingredientsRequest, ingredientsFailed } = useSelector((state: AppStateTypes) => state.ingredients);
  const { ingredientId } = useParams<{ ingredientId: string }>();

  let ingredient = null;
  if (ingredientsList.length > 0) {
    ingredient = ingredientsList.find(item => item._id === ingredientId);
  } else {
    return <Loader />
  }

  const canRenderIngredient = ingredientsList.length > 0 && !ingredientsRequest && !ingredientsFailed;

  return (
    <>
      {canRenderIngredient &&
        ingredient ?
        <div className='mt-20'>
          <IngredientDetails ingredient={ingredient} />
        </div>
        :
        <NotFoundError />
      }
    </>
  )

}

export default IngredientPage;