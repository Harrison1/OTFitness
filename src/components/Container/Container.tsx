import * as React from 'react'
import styled from '../utils/styled-components'

interface ContainerProps {
  children?: React.ReactNode
}

const Div = styled.div`
  margin: auto;
  max-width: 1200px;
`

export const Container = (props: ContainerProps) => 
  <Div>
    {props.children}
  </Div>
