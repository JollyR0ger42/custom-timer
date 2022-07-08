const askPermission = () => {
  if (window.Notification.permission !== 'granted') {
    window.Notification.requestPermission()
  }
}

const send = (title, body) => {
  new Notification(title, {body})
}

export default {
  askPermission,
  send,
}