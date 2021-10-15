import { memo, FC } from 'react';

import ingredientDetailsStyles from './ingredient-details.module.css';
import TBurgersDataTypes from '../../types/t-burgers-data-types';
import modalStyles from '../modal/modal.module.css';

type Props = {
  ingredient: TBurgersDataTypes | undefined;
}

const IngredientDetails: FC<Props> = (props) => {
  if (!props.ingredient) {
    return null
  }
  const { image, name, calories, carbohydrates, fat, proteins } = props.ingredient;

  return (
    <div className={ingredientDetailsStyles.details}>
      <img src={image} alt={name} className={ingredientDetailsStyles.image}/>
      <p
        className={`text text_type_main-medium mb-8 ${ingredientDetailsStyles.subtitle}`}
      >
        {name}
      </p>
      <div className={modalStyles.nutrients}>
        <p className={`text text_type_main-medium ${ingredientDetailsStyles.text} text_color_inactive`}>
          Калории, ккал
          <br />
          {calories}
        </p>
        <p className={`text text_type_main-medium ${ingredientDetailsStyles.text} text_color_inactive`}>
          Белки, г
          <br />
          {proteins}
        </p>
        <p className={`text text_type_main-medium ${ingredientDetailsStyles.text} text_color_inactive`}>
          Жиры, г
          <br />
          {fat}
        </p>
        <p className={`text text_type_main-medium ${ingredientDetailsStyles.text} text_color_inactive`}>
          Углеводы, г
          <br />
          {carbohydrates}
        </p>
      </div>
    </div>
  )
}

export default memo(IngredientDetails);