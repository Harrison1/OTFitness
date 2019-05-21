import * as React from 'react'
import findIndex from 'lodash/fp/findIndex'
import { orangeUsers } from '../api'
import Loader from '../components/Loader'
import UserCard from '../components/UserCard'
import styled from '../components/utils/styled-components'
import EditModal from './EditModal'
import capitizeFirstLetter from '../components/utils/capfl'


interface ListProps {
  gender?: string
}

const UList = styled.ul`
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

const UserList = (props: ListProps) => {
  const [data, setData] = React.useState([])
  const [error, setError] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [friendInfo, setFriendInfo] = React.useState({})

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [isFetching, setFetching] = React.useState(false)
  // const [errorMessage, setErrorMessage] = React.useState('');

  const toggleOpen = () => setOpen(!open)

  const handleFirstName = (e: React.FormEvent<HTMLInputElement>): void => {
    // setErrorMessage('');
    setFirstName(e.currentTarget.value.trim());
  };

  const handleLastName = (e: React.FormEvent<HTMLInputElement>): void => {
    // setErrorMessage('');
    setLastName(e.currentTarget.value.trim());
  };

  const deleteUser = UserId => {
    setFetching(true)
    const item = {UserId}
    fetch(orangeUsers.prod, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(item)
    })
    .then(res => {
      return res.json();
    })
    .then(myData => {
      setFetching(false)
      toggleOpen()
      fetchUsers()
    }).catch(function(err) {
      console.log(err);
    });
  }

  const updateUser = (UserId, first, last) => {
    setFetching(true)
    const item = {UserId, first, last}
    fetch(orangeUsers.prod, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(item)
    })
    .then(res => {
      return res.json();
    })
    .then(myData => {
      setFetching(false)
      toggleOpen()
      fetchUsers()
    }).catch(function(err) {
      console.log(err);
    });
  }

  const fetchUsers = () => {
    fetch(orangeUsers.prod, {
      method: 'GET',
      mode: 'cors',
    })
    .then(res => res.json())
    .then(data => {
      setData(data.Items)
    }).catch(err => setError(err))
  }


  const getUserInfo = uuid => {
    toggleOpen();
    const currentFriend = findIndex({UserId: uuid}, data)
    setFriendInfo(data[currentFriend])
    setFirstName(capitizeFirstLetter(data[currentFriend].Name.first))
    setLastName(capitizeFirstLetter(data[currentFriend].Name.last))
  }

  React.useEffect(() => {
    fetchUsers()
  }, [])

  const renderComp = () => {
    if(data.length > 0) {
      return (
        <>
          <UList>
            {data.map(n => (
              <li key={n.UserId}>
                <UserCard
                  uuid={n.UserId}
                  firstName={n.Name.first}
                  lastName={n.Name.last}
                  gender={n.Gender}
                  src={n.Picture.thumbnail}
                  onClick={getUserInfo}
                />
              </li>
            ))}
          </UList>
          <EditModal 
            open={open}
            toggleModal={toggleOpen}
            user={friendInfo}
            handleFirstName={handleFirstName}
            handleLastName={handleLastName}
            firstName={firstName}
            lastName={lastName}
            updateUser={updateUser}
            deleteUser={deleteUser}
            isFetching={isFetching}
          />
        </>
      )
    }
    return <Loader />
  }

  return renderComp()
}

export default UserList
