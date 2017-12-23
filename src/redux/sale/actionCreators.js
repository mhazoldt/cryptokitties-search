
function startingFetchSalesIds() {
    return { type: 'STARTING_FETCH_SALES_IDS' }
}

function fetchCompleteSalesIds(ids, total) {
    return { type: 'FETCH_COMPLETE_SALES_IDS', ids: ids, total: total }
}

function startingFetchCkData() {
    return { type: 'STARTING_FETCH_CK_DATA' }
}

function fetchCompleteCkData(results) {
    return { type: 'FETCH_COMPLETE_CK_DATA', results: results }
}

function startingFetch() {
    return { type: 'STARTING_FETCH' }
}

function fetchComplete() {
    return { type: 'FETCH_COMPLETE' }
}

function setCards(cards) {
    return { type: 'SET_CARDS', cards: cards }
}

function setCheckboxes(checkboxes) {
    return { type: 'SET_CHECKBOXES', checkboxes: checkboxes }
}

function toggleSearchValue(searchText, valueType, inputType) {
    return { type: 'TOGGLE_SEARCH_VALUE', searchText: searchText, valueType: valueType, inputType: inputType }
}

function setSearchValues(searchValues) {
    return { type: 'SET_SEARCH_VALUES', searchValues: searchValues }
}

function setSalesPageNumber(page) {
    return { type: 'SET_SALES_PAGE_NUMBER', page: page }
}

function setCardAnimation(animation) {
    return { type: 'SET_CARD_ANIMATION', animation: animation }
}

function startingFetchAllCattributes() {
    return { type: 'STARTING_FETCH_ALL_CATTRIBUTES' }
}

function fetchCompleteAllCattributes(allCattributes) {
    return { type: 'FETCH_COMPLETE_ALL_CATTRIBUTES', allCattributes: allCattributes }
}

function setGeneration(change) {
    return { type: 'SET_GENERATION', change: change }
}

function toggleGeneration() {
    return { type: 'TOGGLE_GENERATION' }
}

function setInitialLoad() {
    return { type: 'SET_INITIAL_LOAD' }
}

function setInitialToggle() {
    return { type: 'SET_INITIAL_TOGGLE' }
}

function setSort(order) {
    return { type: 'SET_SORT', order: order }
}

function setActive(active) {
    return { type: 'SET_ACTIVE', active: active }
}

function setResultsChanged(changed) {
    return { type: 'SET_RESULTS_CHANGED', changed: changed }
}


// thunks


function getCatIds(offset, searchText, sort) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(startingFetch())
        dispatch(startingFetchSalesIds())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        let url = 'https://api.cryptokitties.co/auctions?status=open&limit=20type=sale'
        if(offset) {
            url = url + `&offset=${offset}`
        }

        if(searchText) {
            url = url + `&search=${searchText}`
        }

        if(sort) {
            url = url + `&${sort}`
        }

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

                let ids = []

                ids = j.auctions.map((auction) => { return auction.kitty.id })

                let total = j.total

                dispatch(fetchCompleteSalesIds(ids, total))
                dispatch(getCkData(ids))
            })
    }
}


function getCkData(ids) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(startingFetchCkData())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        let promises = ids.map((id) => {
            return new Promise((resolve, reject) => {
                fetch(`https://api.cryptokitties.co/kitties/${id}`)
                    .then((response) => { return response.json() })
                    .then((j) => {
                        resolve(j)
                        return j
                    })
                    .catch((err) => {
                        console.log("err", err)
                        reject(err)

                    })
            })
        })

        Promise.all(promises)
        .then(
            response => {
                dispatch(fetchCompleteCkData(response))
                dispatch(fetchComplete())
            },
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => console.log('An error occurred.', error)
        )

    }
}


function getAllCattributes() {
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

                dispatch(fetchCompleteAllCattributes(j))
                
            })
    }
}


module.exports = { 
    getCatIds,
    setCards,
    setSalesPageNumber,
    getAllCattributes,
    setCheckboxes,
    toggleSearchValue,
    setSearchValues,
    setCardAnimation,
    setGeneration,
    toggleGeneration,
    setInitialLoad,
    setInitialToggle,
    setSort,
    setActive,
    setResultsChanged

}