import React, { FC } from 'react';

import mainContainerStyles from './main-container.styles.module.css'
import mainContainerTypes from '../../types/main-container-types';

const MainContainer: FC<mainContainerTypes> = ({ title, children }) => {
	const uiKitStyles = "pt-10 mb-5 text text_type_main-large"
	return (
		<main className={mainContainerStyles.main}>
			<h2 className={uiKitStyles}>
				{title}
			</h2>
			<div className={mainContainerStyles.container}>
				{children}
			</div>
		</main>
	)
}

export default MainContainer