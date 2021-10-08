import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import AppStateTypes from '../types/app-state-types';
import { getIngredients } from '../services/actions/ingredients';
import Loader from '../components/loader/loader';
import NotFoundError from './not-found-error';

type Params = {
  ingredientId: string
}

function IngredientPage() {
  const dispatch = useDispatch();
  const { ingredientsList } = useSelector((state: AppStateTypes) => state.ingredients);
  const { ingredientId } = useParams<Params>();
  console.log(ingredientId);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  let ingredient = null;
  if (!ingredientsList.length) {
    return <Loader />
  } else {
    ingredient = ingredientsList.find(item => item._id === ingredientId);
  }

  return (
    ingredient ?
      <div className='mt-20'>
        <IngredientDetails ingredient={ingredient} />
      </div>
    :
      <NotFoundError />
      )
}

export default IngredientPage;