import * as React from 'react'
import { Auth } from 'aws-amplify'
import { navigate } from "gatsby"
import { setUser } from '../utils/auth'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  // const [errorMessage, setErrorMessage] = React.useState('');

  const handleEmail = (e: React.FormEvent<HTMLInputElement>): void => {
    // setErrorMessage('');
    setEmail(e.currentTarget.value.trim());
  };

  const handlePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    // setErrorMessage('');
    setPassword(e.currentTarget.value.trim());
  };

  const login = async(e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const user = await Auth.signIn(email, password)
      // const user = await Auth.currentAuthenticatedUser()
      const userInfo = {
        ...user.attributes,
        username: user.username
      }
      setUser(userInfo)
    } catch (err) {
      // set error message here
      console.log('error...: ', err)
    }
  }
  
  return (
    <form>
      <input
        onChange={handleEmail}
        placeholder='Email'
        name='email'
        value={email}
        type="text"
      />
      <input
        onChange={handlePassword}
        placeholder='Password'
        name='password'
        value={password}
        type="password"
      />
      <button
        onClick={login}
      >
        Login
      </button>
    </form>
  )
}

export default Login
