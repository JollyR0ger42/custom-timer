const SERVER = process.env.VUE_APP_SERVER

const postSignup = async (authForm) => {
  const response = await fetch(SERVER + 'auth/signup', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(authForm)
  })
  const result = await response.json()
  return result
}

const postLogin = async (authForm) => {
  const response = await fetch(SERVER + 'auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(authForm)
  })
  console.log(response)
  const result = await response.json()
  return result
}

export default {
  postSignup,
  postLogin
}
