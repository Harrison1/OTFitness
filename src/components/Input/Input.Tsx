import * as React from 'react'
import styled from '../utils/styled-components'

interface InputProps {
  text: string
}

const InputBox = styled.input`
  border: 2px solid red;
`

export const Input = (props: InputProps) => 
  <InputBox placeholder={ props.text} />
