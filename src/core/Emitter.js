export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Уведомляем слушателей

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // on, listen
  // Подписывемся на уведомление
  // Добавояем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
            this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

const emitter = new Emitter()

emitter.subscribe('roman', data => console.log('Sub', data))

emitter.emit('roman', 42)
