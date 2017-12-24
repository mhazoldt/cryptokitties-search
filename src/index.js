import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import reducer from './redux/reducers'
import './styles/index.css';

let loggerMiddleware = createLogger()

let initialState = {
    salesPage: {
        isFetchingSalesIds: false,
        salesIds: [],
        isFetchingCkData: false,
        ckData: [],
        cards: [],
        salesPageNumber: 1,
        isFetching: false,
        allCattributes: [],
        isFetchingAllCattributes: false,
        checkboxes: [],
        searchValues: [],
        total: 0,
        cardAnimation: 'intro',
        generationEnabled: false,
        generation: 0,
        initialLoad: true,
        initialToggle: true,
        sort: false,
        active: false,
        resultsChanged: false
    },
    sirePage: {
        isFetchingSireIds: false,
        sireIds: [],
        isFetchingCkData: false,
        ckData: [],
        cards: [],
        sirePageNumber: 1,
        isFetching: false,
        allCattributes: [],
        isFetchingAllCattributes: false,
        checkboxes: [],
        searchValues: [],
        total: 0,
        cardAnimation: 'intro',
        generationEnabled: false,
        generation: 0,
        initialLoad: true,
        initialToggle: true,
        sort: false,
        active: false,
        resultsChanged: false
    },
    allPage: {
        isFetchingAllIds: false,
        allIds: [],
        isFetchingCkData: false,
        ckData: [],
        cards: [],
        allPageNumber: 1,
        isFetching: false,
        allCattributes: [],
        isFetchingAllCattributes: false,
        checkboxes: [],
        searchValues: [],
        total: 0,
        cardAnimation: 'intro',
        generationEnabled: false,
        generation: 0,
        initialLoad: true,
        initialToggle: true,
        sort: false,
        active: false,
        resultsChanged: false
    },
    baseLayout: {
        ethPrice: null
    }

}

const store = createStore(reducer,
    initialState,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        loggerMiddleware // neat middleware that logs actions
    ))


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
