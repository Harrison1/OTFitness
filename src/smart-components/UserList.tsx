import * as React from 'react'
import { orangeUsers, randomUserAPI } from '../api'
import Loader from '../components/Loader'
import UserCard from '../components/UserCard'
import styled from '../components/utils/styled-components'
import remove from 'lodash/fp/remove'

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
  const [isFetching, setFetching] = React.useState(false)

  const removeUser = id => {
    setData(remove(n => n.login.uuid == id, data))
  }
  
  const addUser = id => {
    const item = data.find( n => n.login.uuid === id)
    setFetching(true)
    fetch(orangeUsers.prod, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      body: JSON.stringify(item)
    })
    .then(res => {
      return res.json();
    })
    .then(myData => {
      removeUser(id)
      setFetching(false)
    }).catch(function(err) {
      console.log(err);
    });
  }

  React.useEffect(() => {
    fetch(`${randomUserAPI}?results=10&gender=${props.gender}`)
    .then(res => res.json())
    .then(data => {
      setData(data.results)
    }).catch(err => setError(err))
  }, [])

  const renderComp = () => {
    if(data.length > 0 && !isFetching) {
      return (
        <UList>
          {data.map(n => (
            <li key={n.login.uuid}>
              <UserCard
                uuid={n.login.uuid}
                firstName={n.name.first}
                lastName={n.name.last}
                gender={n.gender}
                src={n.picture.thumbnail}
                onClick={addUser}
              />
            </li>
          ))}
        </UList>
      )
    }
    return <Loader />
  }

  return renderComp()
}

export default UserList
