import React, { Component } from 'react';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgersDataTypes from '../../types/burgers-data-types';
import burgerConstructorItemStyles from './burger-constructor-item.styles.module.css'

type Props = {
	data: BurgersDataTypes
}

class BurgerConstructorItem extends Component<Props> {
	render() {
		const { image_mobile, name } = this.props.data
		return (
			<div className={burgerConstructorItemStyles.container}>
				<DragIcon type="primary" />
				<img src={image_mobile} alt={name} />
				{this.props.data.name}
			</div>
		)
	}
}

export default BurgerConstructorItem;