import * as React from 'react'
import styled from '../utils/styled-components'

interface HeroProps {
  title: string
  subtitle: string
}

const Div = styled.div`
  background-image: url('https://res.cloudinary.com/dz09rnbhe/image/upload/v1558304778/hero_acsqrf.jpg');
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  display: grid;
  height: 30vh;
  width: 100%;
`

const ContainerDiv = styled.div`
  margin: auto;
`

const Title = styled.h1`
  color: #fff;
  font-size: 5rem;
  line-height: 1.1;
  text-align: center;
`

const Subtitle = styled.h2`
  color: #fff;
  font-size: 3rem;
  line-height: 1.1;
  text-align: center;
  font-weight: 400;
`

export const Hero = (props: HeroProps) => 
  <Div>
    <ContainerDiv>
      <Title>{props.title}</Title>
      <Subtitle>{props.subtitle}</Subtitle>
    </ContainerDiv>
  </Div>
