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
  const timers = await response.json()
  return timers
}

const getTimers = async () => {
  const response = await fetch(SERVER + 'timers', {headers: authHeader()})
  const timers = await response.json()
  return timers
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
  const timer = await response.json()
  return timer
}

export default {
  newTimer,
  getTimers,
  removeTimerById,
  updTimerById
}
