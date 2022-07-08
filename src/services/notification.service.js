const askPermission = () => {
  if (window.Notification.permission !== 'granted') {
    return window.Notification.requestPermission()
  }
  return new Promise()
}

const send = ({title, body}) => {
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