import React from 'react';

import orderDetailsStyles from './oder-details.module.css';
import checkIconPath from '../../images/check.svg';

type Props = {
  orderId: number | string
}

function OrderDetails(props: Props) {
  const { orderId } = props

  return (
    <div>
      <h1 className={`${orderDetailsStyles.order} text text_type_digits-large`}>{orderId}</h1>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={checkIconPath} alt="check-icon" className={orderDetailsStyles.check} />
      <p className={`text text_type_main-medium ${orderDetailsStyles.text} mb-2`}>ваш заказ начали готовить</p>
      <p
        className={`text text_type_main-medium ${orderDetailsStyles.text} text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default React.memo(OrderDetails);