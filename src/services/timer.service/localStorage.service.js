const timers = JSON.parse(window.localStorage.getItem('timers') ?? '[]')
let nextId = 1
if (timers.length) nextId = Math.max(...timers.map(timer => +timer.id)) + 1

const sortTimers = (a, b) => {
  if (a.name > b.name) return 1
  else if (a.name < b.name) return -1
  else return +a.id - b.id
}

const newTimer = async (payload) => {
  const newTimer = {
    ...payload,
    started: new Date().toUTCString(),
    stopped: new Date().toUTCString(),
    timeLeft: payload.initTimeLeft,
    id: nextId
  }
  timers.push(newTimer)
  timers.sort(sortTimers)
  window.localStorage.setItem('timers', JSON.stringify(timers))
  nextId++
  return new Promise((res, rej) => res(timers))
}

const getTimers = async () => {
  return new Promise((res, rej) => {
    res(timers)
  })
}

const removeTimerById = async (id) => {
  return new Promise(() => console.log('resolve?'))
}

const updTimerById = async (id, updFields) => {
  return new Promise(() => console.log('resolve?'))
}

export default {
  newTimer,
  getTimers,
  removeTimerById,
  updTimerById
}
