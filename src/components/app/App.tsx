import React from 'react';
import appStyles from './app.styles.module.css'

import AppHeader from '../app-header/app-header';
import MainContainer from '../main-container/main-container';

import { mainTitle } from '../../utils/menu-titles-data';

function App() {
	return (
		<div className={appStyles.app}>
			<AppHeader />
			<MainContainer title={mainTitle} />
		</div>
	);
}

export default App;
