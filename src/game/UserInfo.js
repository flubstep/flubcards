import EventEmitter from 'events'
import uuid from 'uuid'

class UserInfo {
  constructor() {
    this.events = new EventEmitter
  }

  get() {
    let s = localStorage.getItem('flubcards:userinfo')
    if (!s) {
      return null
    } else {
      return JSON.parse(s)
    }
  }

  remove() {
    localStorage.removeItem('flubcards:userinfo')
    this.events.emit('value', null)
  }

  set(info) {
    let id = uuid.v4()
    localStorage.setItem('flubcards:userinfo', JSON.stringify(Object.assign({ id }, info)))
    this.events.emit('value', info)
  }

  subscribe(callback) {
    callback(this.get())
    this.events.on('value', callback)
  }

  unsubscribe(callback) {
    this.events.removeListener('value', callback)
  }
}

let instance = new UserInfo()
export default instance