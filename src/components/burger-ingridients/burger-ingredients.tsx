import React, { Component } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.styles.module.css';
import BurgersDataTypes from '../../types/burgers-data-types';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

import burgersData from '../../utils/burgers-data';

type Props = {}

const SUBTITLES: {[key:string]: string} = {
	"bun": "Булки",
	"main": "Начинки",
	"sauce": "Соусы"
}

class BurgerIngredients extends Component<Props> {
	state = {
		current: 'Булки'
	}
	setCurrent(value: string) {
		this.setState({ current: value })
	}
	render() {
		return (
			<section>
				{this.renderTabs()}
				<div>
					{this.renderIngredientsSection('bun', burgersData)}
					{this.renderIngredientsSection('sauce', burgersData)}
					{this.renderIngredientsSection('main', burgersData)}
				</div>
			</section>
		)
	}

	renderIngredientsSection(ingredient: string, data: BurgersDataTypes[]) {
		const filteredData = data.filter(item => {
			return item.type === ingredient
		})
		const items = filteredData.map(ingredient => {
			return (
				<BurgerIngredient key={ingredient._id} data={ingredient} />
			)
		})
		const subtitle = SUBTITLES[ingredient]
		return (
			<div>
				<h3 className="text text_type_main-medium mb-6">{subtitle}</h3>
				<div className={`${burgerIngredientsStyles.items} mb-10`}>{items}</div>
			</div>
		)
	}

	renderTabs() {
		const { current } = this.state
		return (
			<div className={`${burgerIngredientsStyles.tabs} mb-10`}>
				<Tab value="Булки" active={current === 'Булки'} onClick={() => this.setCurrent('Булки')} >
					Булки
				</Tab>
				<Tab value="Соусы" active={current === 'Соусы'} onClick={() => this.setCurrent('Соусы')} >
					Соусы
				</Tab>
				<Tab value="Начинки" active={current === 'Начинки'} onClick={() => this.setCurrent('Начинки')} >
					Начинки
				</Tab>
			</div>
		)
	}
}

export default BurgerIngredients