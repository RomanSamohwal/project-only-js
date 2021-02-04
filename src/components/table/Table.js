import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from "@core/dom";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
      super($root, {
        name: 'Table',
        listeners: ['mousedown', 'keydown', 'input'],
        ...options,
      })
    }

    prepare() {
      this.selections = new TableSelection()
    }

    init() {
      super.init();
      this.selectCell(this.$root.find('[data-id="0:1"]'))
      this.$on('formula:input', text => {
        this.selections.current.text(text)
      })
      this.$on('formula:done', () => {
        this.selections.current.focus()
      })
    }

    toHTML() {
      return createTable()
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        return resizeHandler(this.$root, event)
      } else if (isCell(event)) {
        const $target = $(event.target)
        if (event.shiftKey) {
          const $cells = matrix($target, this.selections.current)
              .map(id => this.$root.find(`[data-id='${id}']`))
          this.selections.selectGroup($cells)
        } else {
          this.selections.select($target)
        }
      }
    }

    selectCell($cell) {
      this.selections.select($cell)
      this.$emit('table:select', $cell)
    }

    onKeydown(event) {
      const keys = [
        'Enter',
        'Tab',
        'ArrowRight',
        'ArrowLeft',
        'ArrowUp',
        'ArrowDown'
      ]

      const {key} = event

      if (keys.includes(key) && !event.shiftKey) {
        event.preventDefault()
        const id = this.selections.current.id(true)
        const $next = this.$root.find(nextSelector(key, id));
        this.selectCell($next)
      }
    }

    onInput(event) {
      this.$emit('table:input', $(event.target))
    }
}


