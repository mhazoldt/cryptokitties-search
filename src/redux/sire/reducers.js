import React from 'react';


function sirePage(state = [], action) {
    switch (action.type) {
        case 'STARTING_FETCH_SIRE_IDS': {
            let newState = Object.assign({}, state, {
                isFetchingSireIds: true

            })
            
            return newState
        }
        case 'FETCH_COMPLETE_SIRE_IDS': {
            let newState = Object.assign({}, state, {
                isFetchingSireIds: false,
                sireIds: action.ids,
                total: action.total

            })
            
            return newState
        }
        case 'STARTING_FETCH_CK_DATA_SIRE': {
            let newState = Object.assign({}, state, {
                isFetchingCkData: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE_CK_DATA_SIRE': {
            let newState = Object.assign({}, state, {
                isFetchingCkData: false,
                ckData: action.results

            })
            
            return newState
        }
        case 'SET_CARDS_SIRE': {
            let newState = Object.assign({}, state, {
                cards: action.cards

            })
            
            return newState
        }
        case 'SET_CARD_ANIMATION_SIRE': {
            let newState = Object.assign({}, state, {
                cardAnimation: action.animation

            })
            
            return newState
        }
        case 'SET_CHECKBOXES_SIRE': {
            let newState = Object.assign({}, state, {
                checkboxes: action.checkboxes

            })
            
            return newState
        }
        case 'SET_SEARCH_VALUES_SIRE': {
            let newState = Object.assign({}, state, {
                searchValues: action.searchValues

            })
            
            return newState
        }
        case 'TOGGLE_SEARCH_VALUE_SIRE': {

            let curValues = state.searchValues
            let newValues = []

            newValues = curValues.map((curCheckboxValue) => {
                if (curCheckboxValue.searchText === action.searchText) {
                    curCheckboxValue.value = !curCheckboxValue.value
                    return curCheckboxValue
                } else if (curCheckboxValue.type === action.valueType && action.inputType != 'checkbox') {
                    curCheckboxValue.value = false
                    return curCheckboxValue
                } else {
                    return curCheckboxValue
                }
            })


            let newState = Object.assign({}, state, {
                searchValues: newValues

            })
            
            return newState
        }
        case 'SET_SIRE_PAGE_NUMBER': {
            let newState = Object.assign({}, state, {
                sirePageNumber: action.page

            })
            
            return newState
        }
        case 'SET_SORT_SIRE': {
            let newState = Object.assign({}, state, {
                sort: action.order

            })
            
            return newState
        }
        case 'SET_GENERATION_SIRE': {
            let update

            if (action.change === 'increase') {
                update = state.generation + 1
    
            } else if (action.change === 'decrease') {
                update = state.generation - 1
    
            } else {
                
                update = state.generation
    
            }
            
            let curValues = state.searchValues
            let newValues = []

            newValues = curValues.map((curCheckboxValue) => {
                if (curCheckboxValue.type === 'generation') {
                    curCheckboxValue.searchText = `gen:${update}`
                    return curCheckboxValue
                } else {
                    return curCheckboxValue
                }
            })

            let newState = Object.assign({}, state, {
                generation: update,
                searchValues: newValues
                
            })
            
            return newState

        }
        case 'TOGGLE_GENERATION_SIRE': {
            let curValues = state.searchValues
            let newValues = []

            newValues = curValues.map((curCheckboxValue) => {
                if (curCheckboxValue.type === 'generation') {
                    curCheckboxValue.value = !curCheckboxValue.value
                    return curCheckboxValue
                } else {
                    return curCheckboxValue
                }
            })

            let newState = Object.assign({}, state, {
                generationEnabled: !state.generationEnabled,
                searchValues: newValues
                
            })
            
            return newState
        }
        case 'SET_INITIAL_LOAD_SIRE': {
            let newState = Object.assign({}, state, {
                initialLoad: false
                
            })
            
            return newState
        }
        case 'SET_ACTIVE': {
            let newState = Object.assign({}, state, {
                active: action.active
                
            })
            
            return newState
        }
        case 'SET_RESULTS_CHANGED_SIRE': {
            let newState = Object.assign({}, state, {
                resultsChanged: action.changed
                
            })
            
            return newState
        }
        case 'SET_INITIAL_TOGGLE_SIRE': {
            let newState = Object.assign({}, state, {
                initialToggle: false
                
            })
            
            return newState
        }
        case 'STARTING_FETCH_SIRE': {
            let newState = Object.assign({}, state, {
                isFetching: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE_SIRE': {
            let newState = Object.assign({}, state, {
                isFetching: false,

            })
            
            return newState
        }
        case 'FETCH_COMPLETE_ALL_CATTRIBUTES_B': {
            let cattributes = []
            let total = action.total

            cattributes = action.allCattributes.map((cattribute) => {
                return { description: cattribute.description, type: cattribute.type, percent: parseInt((cattribute.total / total) * 100) }
            })

            let searchValues = []

            cattributes.forEach((cattribute) => {
                // take each cattribute and add it to an array to track input selection in redux
                searchValues.push({ text: <span style={{marginLeft: '-12px'}}>{cattribute.description}<span style={{color: 'white'}}>.</span>{cattribute.percent}%</span>, searchText: cattribute.description, value: false, type: cattribute.type, percent: cattribute.percent })
            })

            let cooldowns = ['fast', 'swift', 'snappy', 'brisk', 'plodding', 'slow', 'sluggish', 'catatonic']

            cooldowns.forEach((cooldown) => {

                searchValues.push({ text: cooldown, searchText: `cooldown:${cooldown}`, value: false, type: 'cooldown' })
            })

            let nfe = ['normal', 'fancy', 'exclusive']

            nfe.forEach((ckType) => {

                searchValues.push({ text: ckType, searchText: `type:${ckType}`, value: false, type: 'ckType' })
            })

            searchValues.push({ text: 'generation', searchText: `gen:${state.generation}`, value: false, type: 'generation' })


            let newState = Object.assign({}, state, {
                searchValues: searchValues

            })
            
            return newState
        }
        default: {
            return state
        }
    }

}


export default sirePage