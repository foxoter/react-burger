import React from 'react';

import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import BurgersDataTypes from '../../types/burgers-data-types';

const tempData = {
  "_id": "60666c42cc7b410027a1a9b1",
  "name": "Краторная булка N-200i",
  "type": "bun",
  "proteins": 80,
  "fat": 24,
  "carbohydrates": 53,
  "calories": 420,
  "price": 1255,
  "image": "https://code.s3.yandex.net/react/code/bun-02.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
  "__v": 0
}

function OrderDetails() {
  return (
    <ModalOverlay>
      <Modal ingredient={tempData} />
    </ModalOverlay>
  )
}

export default OrderDetails;