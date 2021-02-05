import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.unsubscribes = []
    this.prepare()
    this.storeSub = null
  }

  // Настраиваем наш компонент до init
  prepare() {}

  toHTML() {
    return ''
  }

  // Уведомляем слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }
  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент
  // Добавляем DOM слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribes.forEach( unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
