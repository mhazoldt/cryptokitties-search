
function startingFetchAllCattributes() {
    return { type: 'STARTING_FETCH_ALL_CATTRIBUTES_B' }
}

function fetchCompleteAllCattributes(allCattributes, total) {
    return { type: 'FETCH_COMPLETE_ALL_CATTRIBUTES_B', allCattributes: allCattributes, total: total }
}

function completedCattributes() {
    return { type: 'COMPLETED_CATTRIBUTES' }
}



function startingFetchEthPrice() {
    return { type: 'STARTING_FETCH_ETH_PRICE' }
}

function fetchCompleteEthPrice(price) {
    return { type: 'FETCH_COMPLETE_ETH_PRICE', price: price }
}

function completedEthPrice() {
    return { type: 'COMPLETED_ETH_PRICE' }
}



function startingFetchTotal() {
    return { type: 'STARTING_FETCH_TOTAL' }
}

function fetchCompleteTotal(total) {
    return { type: 'FETCH_COMPLETE_TOTAL', total: total }
}

function completedTotal() {
    return { type: 'COMPLETED_TOTAL' }
}




// thunks


function getEthPrice(offset, searchText, sort) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(startingFetchEthPrice())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        let url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'

        console.log(url)

        return fetch(url)
            .then(
            response => response.json(),
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => console.log('An error occurred.', error)
            )
            .then(j => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                console.log('################# data returned ETH ETH ETH', j);

                let price = j.USD

                dispatch(fetchCompleteEthPrice(price))
                dispatch(completedEthPrice())

            })
    }
}


function getAllCattributes() {
    return function (dispatch) {
        dispatch(fetchTotal())
    }
}


function fetchTotal() {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(startingFetchTotal())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        let url = 'https://api.cryptokitties.co/kitties?limit=20'

        console.log(url)

        return fetch(url)
            .then(
            response => response.json(),
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => console.log('An error occurred.', error)
            )
            .then(j => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                console.log('################# data returned', j);

                let total = j.total

                dispatch(fetchCompleteTotal(total))
                dispatch(completedTotal())
                dispatch(fetchAllCattributes(total))

            })
    }
}


function fetchAllCattributes(total) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(startingFetchAllCattributes())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        let url = 'https://api.cryptokitties.co/cattributes?total=true'
        
        return fetch(url)
            .then(
            response => response.json(),
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => console.log('An error occurred.', error)
            )
            .then(j => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                // console.log(j);

                dispatch(fetchCompleteAllCattributes(j, total))
                dispatch(completedCattributes())

            })
    }
}


module.exports = { 
    getAllCattributes,
    getEthPrice
}