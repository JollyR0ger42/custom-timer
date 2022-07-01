export default (ms) => {
  const round = ms < 0 ? Math.ceil : Math.floor
  if (!ms) return {seconds: 0, minutes: 0, hours: 0}
  let seconds = round(ms / 1000)
  let minutes = round(seconds / 60)
  let hours = round(minutes / 60)
  seconds = seconds % 60
  minutes = minutes % 60
  return {seconds, minutes, hours}
}