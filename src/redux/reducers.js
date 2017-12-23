import { combineReducers } from 'redux'

import salesPage from './sale/reducers'
import sirePage from './sire/reducers'
import allPage from './all/reducers'


let reducers = combineReducers({
    salesPage,
    sirePage,
    allPage
  })
  
  export default reducers