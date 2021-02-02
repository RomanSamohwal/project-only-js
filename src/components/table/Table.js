import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, shouldResize} from "@/components/table/table.functions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
      super($root, {
        name: 'Toolbar',
        listeners: ['mousedown']
      });
    }

    prepare() {
      this.selections = new TableSelection()
    }

    init() {
      super.init();
      const $cell = this.$root.find('[data-id="0:1"]')
      this.selections.select($cell)
    }

    toHTML() {
      return createTable()
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        return resizeHandler(this.$root, event)
      } else if (isCell(event)) {
        const $target = $(event.target)
        this.selections.select($target)
      }
    }
}
