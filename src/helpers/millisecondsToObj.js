export default (ms) => {
  if (!ms) return {seconds: 0, minutes: 0, hours: 0}
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  seconds = seconds % 60
  minutes = minutes % 60
  return {seconds, minutes, hours}
}