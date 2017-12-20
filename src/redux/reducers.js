


function fetchReducer(state = [], action) {
    switch (action.type) {
        case 'STARTING_FETCH_SALES_IDS': {
            let newState = Object.assign({}, state, {
                isFetchingSalesIds: true

            })
            
            return newState
        }
        case 'FETCH_COMPLETE_SALES_IDS': {
            let newState = Object.assign({}, state, {
                isFetchingSalesIds: false,
                salesIds: action.ids,
                total: action.total

            })
            
            return newState
        }
        case 'STARTING_FETCH_CK_DATA': {
            let newState = Object.assign({}, state, {
                isFetchingCkData: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE_CK_DATA': {
            let newState = Object.assign({}, state, {
                isFetchingCkData: false,
                ckData: action.results

            })
            
            return newState
        }
        case 'SET_CARDS': {
            let newState = Object.assign({}, state, {
                cards: action.cards

            })
            
            return newState
        }
        case 'SET_CARD_ANIMATION': {
            let newState = Object.assign({}, state, {
                cardAnimation: action.animation

            })
            
            return newState
        }
        case 'SET_CHECKBOXES': {
            let newState = Object.assign({}, state, {
                checkboxes: action.checkboxes

            })
            
            return newState
        }
        case 'SET_SEARCH_VALUES': {
            let newState = Object.assign({}, state, {
                searchValues: action.searchValues

            })
            
            return newState
        }
        case 'TOGGLE_SEARCH_VALUE': {

            let curValues = state.searchValues
            let newValues = []

            newValues = curValues.map((curCheckboxValue) => {
                if (curCheckboxValue.text === action.searchText) {
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
        case 'SET_SALES_PAGE_NUMBER': {
            let newState = Object.assign({}, state, {
                salesPageNumber: action.page

            })
            
            return newState
        }
        case 'STARTING_FETCH': {
            let newState = Object.assign({}, state, {
                isFetching: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE': {
            let newState = Object.assign({}, state, {
                isFetching: false,

            })
            
            return newState
        }
        case 'STARTING_FETCH_ALL_CATTRIBUTES': {
            let newState = Object.assign({}, state, {
                isFetchingAllCattributes: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE_ALL_CATTRIBUTES': {
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


function combined(state = {}, action) {
    return {
        salesPage: fetchReducer(state.salesPage, action)
    }
}


export default combined