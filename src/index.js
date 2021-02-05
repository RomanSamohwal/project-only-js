import './scss/index.scss';
import {Excel} from "@/components/excel/Excel";
import {Header} from "@/components/header/Header";
import {Formula} from "@/components/formula/Formula";
import {Table} from "@/components/table/Table";
import {Toolbar} from "@/components/toolbar/Toolbar";
import {createStore} from "@core/createStore";
import {rootReducer} from "@/redux/rootReducer";

const store = createStore(rootReducer, {
  colState: {}
})

const excel = new Excel('#app', {
  components: [Header, Formula, Table, Toolbar],
  store
})

console.log('Excel', excel)

excel.render()
