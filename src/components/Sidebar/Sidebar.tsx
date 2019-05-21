import * as React from 'react'
import styled from '../utils/styled-components'

interface SidebarProps {
  children?: React.ReactNode
  open?: boolean; 
}

const SDiv = styled(`div`)<SidebarProps>`
  background: #fff;
  padding: 1.5rem;
  position: fixed;
  height: 100vh;
  width: 300px;
  box-shadow: 2px 0px 2px 2px rgba(0, 0, 0, 0.3);
  transform: ${props => props.open ? 'translateX(0px)' : 'translateX(-300px)'}; 
  transition: transform 0.25s ease;
`

const ButtonDiv = styled(`div`)<SidebarProps>`
  text-align: right;
  margin-left: ${props => props.open ? '0px' : '300px'}; 
  transition: margin 0.25s ease;
`

const SButton = styled(`button`)<SidebarProps>`
  background: ${props => props.open ? 'none' : '#fff'}; 
  border: none;
  border-radius: 10px;
  color: #333;
  cursor: pointer;
  margin: 0;
  padding: ${props => props.open ? '0' : '1rem'};
  width: ${props => props.open ? 'auto' : '12rem'};
`

const Holder = styled.div`
  overflow: auto;
  height: 85vh;
`

export const Sidebar = (props: SidebarProps) => {

  const [open, setOpen] = React.useState(true)

  return (
    <SDiv open={open}>
      <ButtonDiv open={open}>
        <SButton
          open={open} 
          onClick={() => setOpen(!open)}>
          {open ? 'close' : 'open friends list'}
        </SButton>
      </ButtonDiv>
      <h3 style={{fontSize: '2rem', marginBottom: '0'}}>Friends List</h3>
      <p style={{fontSize: '1.4rem', marginTop: '0'}}>click a friend card to edit or delete a friend</p>
      <hr />
      <Holder>
        { props.children }
      </Holder>
    </SDiv>
  )
}
