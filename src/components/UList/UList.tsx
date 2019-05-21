import * as React from 'react'
import styled from '../utils/styled-components'

interface UListProps {
  children?: React.ReactNode
}

const UL = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    margin: 1.5rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export const UList = (props: UListProps) => {
  <UL>
    {props.children}
  </UL>
}
