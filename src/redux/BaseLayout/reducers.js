


function baseLayout(state = [], action) {
    switch (action.type) {

        case 'STARTING_FETCH_ALL_CATTRIBUTES_B': {
            let newState = Object.assign({}, state, {
                isFetchingAllCattributes: true
                
            })
            
            return newState
        }
        case 'FETCH_COMPLETE_ALL_CATTRIBUTES_B': {
            let cattributes = []
            let total = action.total

            cattributes = action.allCattributes.map((cattribute) => {
                return { description: cattribute.description, type: cattribute.type, percent: parseInt((cattribute.total / total) * 100) }
            })

            let newState = Object.assign({}, state, {
                isFetchingAllCattributes: false,
                allCattributes: cattributes

            })
            
            return newState
        }
        case 'COMPLETED_CATTRIBUTES': {
            let newState = Object.assign({}, state, {
                completedCattributes: true

            })
            
            return newState
        }

        case 'STARTING_FETCH_ETH_PRICE': {
            let newState = Object.assign({}, state, {
                isFetchingEthPrice: true,

            })
            
            return newState
        }
        case 'FETCH_COMPLETE_ETH_PRICE': {
            let newState = Object.assign({}, state, {
                isFetchingEthPrice: false,
                ethPrice: action.price

            })
            
            return newState
        }
        case 'COMPLETED_ETH_PRICE': {
            let newState = Object.assign({}, state, {
                completedEthPrice: true

            })
            
            return newState
        }

        case 'STARTING_FETCH_TOTAL': {
            let newState = Object.assign({}, state, {
                isFetchingTotal: true,

            })
            
            return newState
        }
        case 'FETCH_COMPLETE_TOTAL': {
            let newState = Object.assign({}, state, {
                isFetchingTotal: false,
                total: action.total

            })
            
            return newState
        }
        case 'COMPLETED_TOTAL': {
            let newState = Object.assign({}, state, {
                completedTotal: true

            })
            
            return newState
        }
        default: {
            return state
        }
    }

}


export default baseLayout