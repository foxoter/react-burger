import { ReactNode, memo, FC } from 'react';

import mainContainerStyles from './main-container.module.css';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
        <DndProvider backend={HTML5Backend}>
          {children}
        </DndProvider>
      </section>
    </>
  )
}

export default memo(MainContainer);