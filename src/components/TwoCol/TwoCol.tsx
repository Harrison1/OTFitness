import * as React from 'react'
import styled from '../utils/styled-components'

interface TwoColProps {
  children?: React.ReactNode
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`

export const TwoCol = (props: TwoColProps) => 
  <Div>
    {props.children}
  </Div>
