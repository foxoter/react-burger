import React, {Component} from 'react';

import BurgerIngredients from '../burger-ingridients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import mainContainerStyles from './main-container.styles.module.css'
import BurgersDataTypes from '../../types/burgers-data-types';

type Props = {
  title: string
}

class MainContainer extends Component<Props> {
  state = {
    constructorItems: []
  }
  addItem = (item: BurgersDataTypes) => {
    if (item.type === 'bun') {
      const {constructorItems} = this.state;
      const filteredItems = constructorItems.filter((item: BurgersDataTypes) => item.type !== 'bun');
      const updatedItems = [...filteredItems, item];
      this.setState({constructorItems: updatedItems});
    } else {
      const updatedItems = [...this.state.constructorItems, item];
      this.setState({constructorItems: updatedItems});
    }
  }

  render() {
    const {constructorItems} = this.state
    return (
      <main className={mainContainerStyles.main}>
        <h2 className="pt-10 mb-5 text text_type_main-large">
          {this.props.title}
        </h2>
        <section className={mainContainerStyles.container}>
          <BurgerIngredients onPickItem={this.addItem}/>
          <BurgerConstructor pickedItems={constructorItems}/>
        </section>
      </main>
    )
  }
}

export default MainContainer