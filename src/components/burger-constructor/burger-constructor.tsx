import React, { Component } from 'react';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';

import burgerConstructorStyles from './burger-constructor.styles.module.css';
import BurgerConstructorTypes from '../../types/burger-constructor-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends Component<BurgerConstructorTypes> {
	state = {
		orderTotal: 0
	}

	componentDidUpdate(prevProps: BurgerConstructorTypes) {
		if (prevProps !== this.props) {
			const { pickedItems } = this.props
			if (pickedItems) {
				const orderValue = pickedItems.reduce((sum, current) => sum += current.price, 0);
				this.setState({ orderTotal: orderValue });
			}
		}
	}

	render() {
		const { pickedItems } = this.props
		const { orderTotal } = this.state
		const bun = pickedItems.find(item => item.type === 'bun');
		const otherItems = pickedItems.filter(item => item.type !== 'bun');

		const otherElements = otherItems.map((ingredient, index) => {
			return <BurgerConstructorItem data={ingredient} key={index} />
		})

		return (
			<div className={`${burgerConstructorStyles.container}`}>
				{bun &&
        	<BurgerConstructorItem data={bun} headItem />
				}
				{otherItems &&
					<div className={burgerConstructorStyles.items}>{otherElements}</div>
				}
				{bun &&
        	<BurgerConstructorItem data={bun} tailItem />
				}
				{pickedItems.length > 0 &&
					<div className={`${burgerConstructorStyles.price} pl-4 pr-4`}>
						<p className="text text_type_digits-medium">{orderTotal}</p>
						<CurrencyIcon type="primary" />
						<Button type="primary" size="large">
								Оформить заказ
						</Button>
					</div>
				}
			</div>
		);
	}
}

export default BurgerConstructor;