import EventEmitter from 'events'
import uuid from 'uuid'

class UserInfo {
  constructor() {
    this.events = new EventEmitter
  }

  get() {
    return localStorage.getItem('flubcards:userinfo') || null
  }

  remove() {
    localStorage.removeItem('flubcards:userinfo')
    this.events.emit('value', null)
  }

  set(info) {
    let id = uuid.v4()
    localStorage.setItem('flubcards:userinfo', Object.assign({ id }, info))
    this.events.emit('value', info)
  }

  subscribe(callback) {
    callback(this.get())
    this.events.on('value', callback)
  }
}

let instance = new UserInfo
export default instance