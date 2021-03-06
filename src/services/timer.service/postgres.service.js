const SERVER = process.env.VUE_APP_SERVER
import {authHeader} from './auth-header.js'

const newTimer = async (newTimer) => {
  const response = await fetch(SERVER + 'timers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(newTimer)
  })
  const result = await response.json()
  if (response.status !== 201) throw result
  return result
}

const getTimers = async () => {
  const response = await fetch(SERVER + 'timers', {headers: authHeader()})
  const result = await response.json()
  if (response.status !== 200) throw {...result, status: response.status}
  return result
}

const removeTimerById = async (id) => {
  const response = await fetch(SERVER + 'timers/' + id, {
    method: 'DELETE',
    headers: authHeader()
  })
  const timers = await response.json()
  return timers
}

const updTimerById = async (id, updFields) => {
  const response = await fetch(SERVER + 'timers/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    body: JSON.stringify(updFields)
  })
  const result = await response.json()
  return result
}

export default {
  newTimer,
  getTimers,
  removeTimerById,
  updTimerById
}
