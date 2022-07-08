import _ from 'lodash';

const timers = JSON.parse(window.localStorage.getItem('timers') ?? '[]')
let nextId = 1
if (timers.length) nextId = Math.max(...timers.map(timer => +timer.id)) + 1

const sortTimers = (a, b) => {
  if (a.name > b.name) return 1
  else if (a.name < b.name) return -1
  else return +a.id - b.id
}

const saveTimers = () => {
  timers.sort(sortTimers)
  window.localStorage.setItem('timers', JSON.stringify(timers))
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
  saveTimers()
  nextId++
  return new Promise((res, rej) => res(_.cloneDeep(timers)))
}

const getTimers = async () => {
  return new Promise((res, rej) => res(_.cloneDeep(timers)))
}

const removeTimerById = async (id) => {
  const removeIdx = timers.findIndex(timer => timer.id == id)
  if (removeIdx >= 0) {
    timers.splice(removeIdx, 1)
    saveTimers()
  }
  return new Promise((res, rej) => res(_.cloneDeep(timers)))
}

const updTimerById = async (id, payload) => {
  const targetIdx = timers.findIndex(timer => timer.id == id)
  let timer = timers[targetIdx]
  const fields = {...payload}
  if (payload?.stopped && !payload?.timeLeft
    && timer.started && !timer.stopped
  ) {
    const timePassed = new Date(payload.stopped) - new Date(timer.started)
    fields.timeLeft = timer.timeLeft - timePassed
  }
  if (payload.initTimeLeft && timer.initTimeLeft != payload.initTimeLeft) {
    fields.started = new Date().toUTCString()
    fields.stopped = new Date().toUTCString()
    fields.timeLeft = payload.initTimeLeft
    fields.runOutAt = null
  }
  timers[targetIdx] = {...timer, ...fields}
  saveTimers()
  return new Promise((res, rej) => res(_.cloneDeep(timers)))
}

export default {
  newTimer,
  getTimers,
  removeTimerById,
  updTimerById
}
