import { ReactNode, memo, FC } from 'react';

import mainContainerStyles from './main-container.module.css';

type Props = {
  title: string
  children: ReactNode
}

const MainContainer: FC<Props> = ({ title, children }) => {
  return (
    <>
      <h2 className="pt-10 mb-5 text text_type_main-large">
        {title}
      </h2>
      <section className={mainContainerStyles.container}>
        {children}
      </section>
    </>
  )
}

export default memo(MainContainer);