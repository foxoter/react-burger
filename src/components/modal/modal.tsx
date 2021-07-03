import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import checkIconPath from '../../images/check.svg'

import modalStyles from './modal.styles.module.css';

import BurgersDataTypes from '../../types/burgers-data-types';

type Props = {
  orderId?: string | number
  ingredient?: BurgersDataTypes
}

function Modal(props: Props) {
  const { orderId, ingredient } = props

  const renderOrder = () => {
    return (
      <>
        <h1 className={`${modalStyles.order} text text_type_digits-large`}>{props.orderId}</h1>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={checkIconPath} alt="check-icon" className={modalStyles.check} />
        <p className={`text text_type_main-medium ${modalStyles.text} mb-2`}>Ваш заказ начали готовить</p>
        <p
          className={`text text_type_main-medium ${modalStyles.text} text_color_inactive`}
        >
          Дождитесь готовности на орбитальной станции
        </p>
      </>
    )
  }

  const renderIngredient = () => {
    if (props.ingredient) {
      const { image, name, calories, carbohydrates, fat, proteins } = props.ingredient
      return (
        <div className={modalStyles.details}>
          <img src={image} alt={name} className={modalStyles.image}/>
          <p className="text text_type_main-medium mb-8">{name}</p>
          <div className={modalStyles.nutrients}>
            <p className={`text text_type_main-medium ${modalStyles.text} text_color_inactive`}>
              Калории, ккал
              <br />
              {calories}
            </p>
            <p className={`text text_type_main-medium ${modalStyles.text} text_color_inactive`}>
              Белки, г
              <br />
              {proteins}
            </p>
            <p className={`text text_type_main-medium ${modalStyles.text} text_color_inactive`}>
              Жиры, г
              <br />
              {fat}
            </p>
            <p className={`text text_type_main-medium ${modalStyles.text} text_color_inactive`}>
              Углеводы, г
              <br />
              {carbohydrates}
            </p>
          </div>
        </div>
      )
    }
  }

  const renderHeading = () => {
    return (
      <div className={modalStyles.header}>
        {ingredient && <p className={`${modalStyles.heading} text text_type_main-medium`}>Детали ингердиента</p>}
        <CloseIcon type="primary" />
      </div>
    )
  }

  return (
    <div className={`${modalStyles.container} p-10`}>
      {renderHeading()}
      {orderId ? renderOrder() : renderIngredient()}
    </div>
  )
}

export default Modal;