import { memo, FC } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { useSelector } from '../services/hooks';
import Loader from '../components/loader/loader';
import NotFoundError from './not-found-error';

const IngredientPage: FC = () => {
  const { ingredientsList, ingredientsRequest, ingredientsFailed } = useSelector(state => state.ingredients);
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

export default memo(IngredientPage);