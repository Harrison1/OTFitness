import * as React from 'react'
import styled from '../utils/styled-components'
import Container from '../Container'

const FDiv = styled.footer`
  background: #333;
  color: #fff;
  font-size: 1.5rem;
  padding: 2rem 0;
  width: 100%;
  a {
    color: #fff;
    text-decoration: underline;
  }
`

export const Footer = () => 
  <FDiv>
    <Container>
      © {new Date().getFullYear()}, Built by <a href="https://harrisonmcguire.com">Harrison McGuire</a>
    </Container>
  </FDiv>
