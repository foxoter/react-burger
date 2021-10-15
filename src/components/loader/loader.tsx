import { FC } from 'react';

import loaderStyles from './loader.module.css'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Loader: FC = () => {
  return (
    <div className={loaderStyles.container}>
      <div className={loaderStyles.loader}>
        <BurgerIcon type='secondary' />
      </div>
    </div>
  )
}

export default Loader;