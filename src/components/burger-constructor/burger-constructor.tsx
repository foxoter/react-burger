import React, { Component } from 'react';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';

// import burgerConstructorStyles from './burger-constructor.styles.module.css';
import BurgersDataTypes from '../../types/burgers-data-types';

type Props = {
	pickedItems: BurgersDataTypes[]
}

class BurgerConstructor extends Component<Props> {
	state = {
		orderTotal: 0
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps !== this.props) {
			const { pickedItems } = this.props
			if (pickedItems) {
				const orderValue = pickedItems.reduce((sum, current) => sum += current.price, 0);
				this.setOrderTotal('inc', orderValue);
			}
		}
	}

	setOrderTotal = (operation: string, value: number) => {
		if (operation === 'inc') {
			this.setState({ orderTotal: this.state.orderTotal + value })
		} else {
			this.setState({ orderTotal: this.state.orderTotal - value })
		}
	}

	render() {
		const { pickedItems } = this.props
		const { orderTotal } = this.state
		const buns = pickedItems.filter(item => item.type === 'bun');
		const otherItems = pickedItems.filter(item => item.type !== 'bun');

		const bunsElements = buns.map((bun, index) => {
			return <BurgerConstructorItem data={bun} key={index}/>
		})
		const otherElements = otherItems.map((ingredient, index) => {
			return <BurgerConstructorItem data={ingredient} key={index} />
		})

		return (
			<section className={`pl-4 pr-4`}>
				{buns && bunsElements}
				{otherItems && otherElements}
				{orderTotal > 0 &&
					<p>{orderTotal}</p>
				}
			</section>
		);
	}
}

export default BurgerConstructor