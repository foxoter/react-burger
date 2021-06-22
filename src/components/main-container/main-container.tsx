import React, { FC } from 'react';

import mainContainerStyles from './main-container.styles.module.css'
import MainContainerTypes from '../../types/main-container-types';

const MainContainer: FC<MainContainerTypes> = ({ title, children }) => {
	const uiKitStyles = "pt-10 mb-5 text text_type_main-large"
	return (
		<main className={mainContainerStyles.main}>
			<h2 className={uiKitStyles}>
				{title}
			</h2>
			<section className={mainContainerStyles.container}>
				{children}
			</section>
		</main>
	)
}

export default MainContainer