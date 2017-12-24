


function allPage(state = [], action) {
    switch (action.type) {
        case 'STARTING_FETCH_ALL_IDS': {
            let newState = Object.assign({}, state, {
                isFetchingAllIds: true

            })
            
            return newState
        }
        case 'FETCH_COMPLETE_ALL_IDS': {
            let newState = Object.assign({}, state, {
                isFetchingAllIds: false,
                allIds: action.ids,
                total: action.total

            })
            
            return newState
        }
        case 'STARTING_FETCH_CK_DATA_ALL': {
            let newState = Object.assign({}, state, {
                isFetchingCkData: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE_CK_DATA_ALL': {
            let newState = Object.assign({}, state, {
                isFetchingCkData: false,
                ckData: action.results

            })
            
            return newState
        }
        case 'SET_CARDS_ALL': {
            let newState = Object.assign({}, state, {
                cards: action.cards

            })
            
            return newState
        }
        case 'SET_CARD_ANIMATION_ALL': {
            let newState = Object.assign({}, state, {
                cardAnimation: action.animation

            })
            
            return newState
        }
        case 'SET_CHECKBOXES_ALL': {
            let newState = Object.assign({}, state, {
                checkboxes: action.checkboxes

            })
            
            return newState
        }
        case 'SET_SEARCH_VALUES_ALL': {
            let newState = Object.assign({}, state, {
                searchValues: action.searchValues

            })
            
            return newState
        }
        case 'TOGGLE_SEARCH_VALUE_ALL': {

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
        case 'SET_ALL_PAGE_NUMBER': {
            let newState = Object.assign({}, state, {
                allPageNumber: action.page

            })
            
            return newState
        }
        case 'SET_SORT_ALL': {
            let newState = Object.assign({}, state, {
                sort: action.order

            })
            
            return newState
        }
        case 'SET_GENERATION_ALL': {
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
        case 'TOGGLE_GENERATION_ALL': {
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
        case 'SET_INITIAL_LOAD_ALL': {
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
        case 'SET_RESULTS_CHANGED_ALL': {
            let newState = Object.assign({}, state, {
                resultsChanged: action.changed
                
            })
            
            return newState
        }
        case 'SET_INITIAL_TOGGLE_ALL': {
            let newState = Object.assign({}, state, {
                initialToggle: false
                
            })
            
            return newState
        }
        case 'STARTING_FETCH_ALL': {
            let newState = Object.assign({}, state, {
                isFetching: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE_ALL': {
            let newState = Object.assign({}, state, {
                isFetching: false,

            })
            
            return newState
        }
        case 'STARTING_FETCH_ALL_CATTRIBUTES_ALL': {
            let newState = Object.assign({}, state, {
                isFetchingAllCattributes: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE_ALL_CATTRIBUTES_ALL': {
            let newState = Object.assign({}, state, {
                isFetchingAllCattributes: false,
                allCattributes: action.allCattributes

            })
            
            return newState
        }
        default: {
            return state
        }
    }

}


export default allPage