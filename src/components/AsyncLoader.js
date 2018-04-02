// @flow
import Loadable from 'react-loadable'
import React from 'react'

const AsyncLoader = (func: mixed) => {
  return Loadable({
    loader: func,
    loading: () => <p>Loading...</p>
  })
}

export default AsyncLoader