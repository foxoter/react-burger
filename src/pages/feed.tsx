import { FC, memo } from 'react';
import MainContainer from '../components/main-container/main-container';

const Feed: FC = () => {
  return (
    <MainContainer title='Лента заказов'>
      <div>feed</div>
      <div>info</div>
    </MainContainer>
  )
}

export default memo(Feed);