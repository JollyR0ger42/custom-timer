const askPermission = () => {
  if (window.Notification.permission !== 'granted') {
    window.Notification.requestPermission()
  }
}

const send = (title, body) => {
  new Notification(title, {body})
}

const isPermited = () => {
  return window.Notification.permission === 'granted'
}

export default {
  askPermission,
  send,
  isPermited,
}