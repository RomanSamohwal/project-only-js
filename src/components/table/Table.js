import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {shouldResize} from "@/components/table/table.functions";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
      super($root, {
        name: 'Toolbar',
        listeners: ['mousedown']
      });
    }

    toHTML() {
      return createTable()
    }

    onMousedown(event) {
      if (shouldResize(event)) {
        return resizeHandler(this.$root, event)
      }
    }
}
