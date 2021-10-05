import React from 'react';

type Props = {
  children: React.ReactNode
}

function AuthWrapper(props: Props) {
  console.log('auth wrapper works');
  return <>{props.children}</>
}

export default AuthWrapper;