import React, { Component } from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import BurgersDataTypes from '../../types/burgers-data-types';
import burgerConstructorItemStyles from './burger-constructor-item.styles.module.css'

type Props = {
	data: BurgersDataTypes
	headItem?: boolean
	tailItem?: boolean
}

class BurgerConstructorItem extends Component<Props> {
	render() {
		const { data: { image, name, price }, headItem, tailItem } = this.props;
		const type = headItem ? "top" : tailItem ? "bottom" : undefined;
		const title = headItem ? `${name} (верх)` : tailItem ? `${name} (низ)` : name;
		return (
			<div className={burgerConstructorItemStyles.item}>
				<DragIcon type='primary' />
				<ConstructorElement
					type={type}
					isLocked={headItem || tailItem}
					text={title}
					price={price}
					thumbnail={image}
				/>
			</div>
		)
	}
}

export default BurgerConstructorItem;