import { LOCALSTORAGE_NAME, SECRET_KEY } from '../constants/config'
import { database } from './firebase';
import { push, ref, get, equalTo, query, orderByChild } from 'firebase/database'

export const registerRequest = async (data) => {
  const { email, password } = data;

  const userRef = ref(database, 'users')
  const userQuery = query(userRef, orderByChild('email'), equalTo(email))
  const users = await get(userQuery)
  if (users.exists()) {
    throw new Error("This email already exists")
  }

  const { key } = await push(ref(database, 'users'), {email, password});
  const user = await get(ref(database, 'users/' + key))
  
  const token = {id: key}
  localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(token))

  return user.val()
}

export const loginRequest = async (data) => {
  const { email, password } = data;

  const userRef = ref(database, 'users')
  const userQuery = query(userRef, orderByChild('email'), equalTo(email))
  const users = await get(userQuery)
  if (!users.exists()) {
    throw new Error("User doesn't exist")
  }

  const firstKey = Object.keys(users.val())[0]
  if (users.val()[firstKey].password !== password) {
    throw new Error('Password is incorrect')
  }

  const token = {id: firstKey}
  localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(token))
  
  return users.val()[firstKey]
}

export const verifyTokenRequest = async () => {
  const token = localStorage.getItem(LOCALSTORAGE_NAME)
  if (!token) 
    throw new Error('No token')

  let decoded
  try {
    decoded = token
  } catch (e) {
    throw new Error('No authorization')
  }
  const userRef = ref(database, 'users/' + JSON.parse(decoded).id)
  const userFound = await get(userRef)
  if (!userFound) 
    throw new Error('No authorization')
  return {
    id: userFound.key,
    email: userFound.val().email,
  };
}

export const logoutRequest = () => {
  localStorage.removeItem(LOCALSTORAGE_NAME)
}