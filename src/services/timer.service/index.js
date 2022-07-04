let Timer

if (process.env.VUE_APP_SERVER) {
  Timer = require('./postgres.service.js').default
} else {
  Timer = require('./localStorage.service.js').default
}

export default Timer
