import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
      super($root, {
        name: 'Toolbar',
        listeners: ['click']
      });
    }

    toHTML() {
      return createTable()
    }

    onClick(event) {
      console.log(event.target)
    }
}
