import React, { Component } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItemTypes from '../../types/burger-ingredients-item-types';
import BurgersDataTypes from '../../types/burgers-data-types';
import burgerIngredientStyles from './burger-ingredients-item.styles.module.css';

class BurgerIngredientsItem extends Component<BurgerIngredientsItemTypes> {
	state = {
		orderCount: 0
	}
	handlePurchase = (data: BurgersDataTypes) => {
		const count = this.state.orderCount + 1;
		this.setState({ orderCount: count })
		this.props.onPurchase(data);
	}
	render() {
		const { image, name, price } = this.props.data
		const { orderCount } = this.state
		return (
			<div className={`${burgerIngredientStyles.container} pl-4 pr-4`} onClick={() => this.handlePurchase(this.props.data)}>
				{orderCount > 0 &&
					<div className={burgerIngredientStyles.counter}>
						<Counter count={orderCount} size='default' />
					</div>
				}
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

export default BurgerIngredientsItem;