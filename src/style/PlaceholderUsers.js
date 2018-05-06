// @flow
import * as React from 'react'
import styled from 'styled-components'

const Holder = styled.div`
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`

const Inner = styled.div`
  padding: 2rem;
  background-color: #eee;
`

export const PlaceholderUsers = () => {
  const arr = new Array(4).fill(null)

  const list = arr.map((nullItem, index) => {
    return (
      <Holder key={index}>
        <Inner />
      </Holder>
    )
  })

  return (
    <React.Fragment>
      {list}
    </React.Fragment>
  )
}
