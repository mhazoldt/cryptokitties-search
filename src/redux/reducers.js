import { combineReducers } from 'redux'

import salesPage from './sale/reducers'
import sirePage from './sire/reducers'
import allPage from './all/reducers'
import baseLayout from './BaseLayout/reducers'


let reducers = combineReducers({
    salesPage,
    sirePage,
    allPage,
    baseLayout
  })
  
  export default reducers