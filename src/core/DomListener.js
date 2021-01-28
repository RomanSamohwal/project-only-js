import {capitalize} from "@core/utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!!!')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      // eslint-disable-next-line no-unused-vars
      const method = getMethodName(listener)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {}
}
// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}

