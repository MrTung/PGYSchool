import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const RealTokenKey = 'Real-Token'

export function getRealToken() {
  return Cookies.get(RealTokenKey)
}

export function setRealToken(token) {
  return Cookies.set(RealTokenKey, token)
}

export function removeRealToken() {
  return Cookies.remove(RealTokenKey)
}



export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
