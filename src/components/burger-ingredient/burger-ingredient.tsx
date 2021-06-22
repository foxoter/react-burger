import React, { Component } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgersDataTypes from '../../types/burgers-data-types';
import burgerIngredientStyles from './burger-ingredient.styles.module.css';

type Props = {
	data: BurgersDataTypes
}

class BurgerIngredient extends Component<Props> {
	render() {
		const { image, name, price } = this.props.data
		return (
			<div className={burgerIngredientStyles.container}>
				<img src={image} alt={name} className='mb-1'/>
				<div className={`${burgerIngredientStyles.price} mb-1`}>
					<p className='mr-2 text text_type_digits-default'>{price}</p>
					<CurrencyIcon type="primary"/>
				</div>
				<p className={`${burgerIngredientStyles.title} text text_type_main-medium`}>{name}</p>
			</div>
		);
	}
}

export default BurgerIngredient;