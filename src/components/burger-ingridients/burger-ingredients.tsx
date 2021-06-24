import React, { Component } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import burgerIngredientsStyles from './burger-ingredients.styles.module.css';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

import burgersData from '../../utils/burgers-data';
import BurgerIngredientsTypes from '../../types/burger-ingredients-types';

const SUBTITLES: {[key:string]: string} = {
	"bun": "Булки",
	"main": "Начинки",
	"sauce": "Соусы"
}

class BurgerIngredients extends Component<BurgerIngredientsTypes> {
	state = {
		currentTab: 'Булки'
	}

	setCurrentTab(value: string) {
		this.setState({ currentTab: value })
	}

	render() {
		return (
			<div>
				{this.renderTabs()}
				<div className={burgerIngredientsStyles.sections}>
					{this.renderIngredientsSection('bun')}
					{this.renderIngredientsSection('sauce')}
					{this.renderIngredientsSection('main')}
				</div>
			</div>
		)
	}

	renderIngredientsSection(ingredient: string) {
		const filteredData = burgersData.filter(item => {
			return item.type === ingredient
		})
		const items = filteredData.map(ingredient => {
			return (
				<BurgerIngredientsItem key={ingredient._id} data={ingredient} onPurchase={this.props.onPickItem}/>
			)
		})
		const subtitle = SUBTITLES[ingredient]

		return (
			<div>
				<h3 className="text text_type_main-medium mb-6">{subtitle}</h3>
				<div className={`${burgerIngredientsStyles.items} mb-10 pl-4 pr-4`}>{items}</div>
			</div>
		)
	}

	renderTabs() {
		const { currentTab } = this.state

		return (
			<div className={`${burgerIngredientsStyles.tabs} mb-10`}>
				<Tab value="Булки" active={currentTab === 'Булки'} onClick={() => this.setCurrentTab('Булки')} >
					Булки
				</Tab>
				<Tab value="Соусы" active={currentTab === 'Соусы'} onClick={() => this.setCurrentTab('Соусы')} >
					Соусы
				</Tab>
				<Tab value="Начинки" active={currentTab === 'Начинки'} onClick={() => this.setCurrentTab('Начинки')} >
					Начинки
				</Tab>
			</div>
		)
	}
}

export default BurgerIngredients;