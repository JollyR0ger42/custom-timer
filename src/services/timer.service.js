const SERVER = process.env.VUE_APP_SERVER

const newTimer = async (newTimer) => {
  const response = await fetch(SERVER + 'timers', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newTimer)
  })
  const timers = await response.json()
  return timers
}

const getTimers = async () => {
  const response = await fetch(SERVER + 'timers')
  const timers = await response.json()
  return timers
}

const removeTimerById = async (id) => {
  const response = await fetch(SERVER + 'timers/' + id, {method: 'DELETE'})
  const timers = await response.json()
  return timers
}

const updTimerById = async (id, updFields) => {
  const response = await fetch(SERVER + 'timers/' + id, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
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
