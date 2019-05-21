import * as React from 'react'
import styled from '../components/utils/styled-components'
import Loader from '../components/Loader'
import Portal from '../components/Portal'

interface ModalProps {
  children?: React.ReactNode
  src?: string
  open?: boolean
  isDelete?: boolean
  isFetching?: boolean
  handleFirstName?: () => void
  firstName?: string
  handleLastName?: (e) => void
  lastName?: string
  deleteUser?: (u) => void
  updateUser?: (u,f,l) => void
  toggleModal?: (e) => void
  user?: {
    Picture: {
      large: string
    }, 
    Name: {
      first: string, 
      last: string
    }
    UserId: string
  }
}

const Container = styled.div`
`

const Background = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

const EditDiv = styled.div`
  width: 500px;
  height: 500px;
  background: white;
  position: absolute;
  border-radius: 10px;
  padding: 20px;
  top: 0;
  left: 0;
  right: 0;
  margin: 100px auto;
`

const PortraitImage  = styled.img`
  border-radius: 10px;
`

const ActionButton = styled(`button`)<ModalProps>`
  background: white;
  border-radius: 10px;
  border: 3px solid ${props => props.isDelete ? '#ad1457' : '#81c784'};
  color: ${props => props.isDelete ? '#ad1457' : '#81c784'}; 
  padding: 10px;
  font-size: 2rem;
  cursor: pointer;
  margin: 1rem;
  &:hover {
    color: white;
    background: ${props => props.isDelete ? '#ad1457' : '#81c784'};
  }
`

const Label = styled.label`
  display: block;
  font-size: 2rem;
`

const Input = styled.input`
  display: block;
  margin-bottom: 2rem;
  border-radius: 10px;
  font-size: 1.8rem;
  padding: 1rem;
  border: 2px solid #42a5f5;
`

const EditModal = (props: ModalProps) => {
  const triggerUpdate = () => {
    props.updateUser(props.user.UserId, props.firstName.toLowerCase(), props.lastName.toLowerCase())
  }

  const triggerDelete = () => {
    props.deleteUser(props.user.UserId)
  }

  return (
    props.open 
    ? <Portal id='edit-modal'>
        <Container>
          <Background onClick={props.toggleModal} />
          <EditDiv>
            <h3 style={{fontSize: '2rem'}}>Edit Fried</h3>
            <hr />
            <div>
              <PortraitImage 
                src={props.user.Picture.large}
                alt={`${props.user.Name.first} ${props.user.Name.last}`}
              />
            </div>
            <form>
              <Label>First Name</Label>
              <Input
                onChange={props.handleFirstName}
                placeholder='First Name'
                name='firstname'
                value={props.firstName}
                type='text'
              />
              <Label>Last Name</Label>
              <Input
                onChange={props.handleLastName}
                placeholder='Last Name'
                name='lastname'
                value={props.lastName}
                type='text'
              />
            </form>
            {props.isFetching
             ? <Loader />
             : <>
                <ActionButton
                  onClick={triggerUpdate}
                  disable={props.isFetching}
                >
                Update
                </ActionButton>
                <ActionButton
                  onClick={triggerDelete} 
                  isDelete
                  disable={props.isFetching}
                >
                  Delete
                </ActionButton>
              </>
            }

          </EditDiv>
        </Container>
      </Portal>
    : null
  )
}

export default EditModal
