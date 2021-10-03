import React, { useEffect } from 'react';

type Props = {
  children: React.ReactNode
}

function AuthWrapper(props: Props) {
  return (
    <>
      {props.children}
    </>
  )
}

export default AuthWrapper;