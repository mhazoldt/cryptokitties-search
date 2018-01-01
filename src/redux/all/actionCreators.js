
function startingFetchAllIds() {
    return { type: 'STARTING_FETCH_ALL_IDS' }
}

function fetchCompleteAllIds(ids, total) {
    return { type: 'FETCH_COMPLETE_ALL_IDS', ids: ids, total: total }
}

function startingFetchCkData() {
    return { type: 'STARTING_FETCH_CK_DATA_ALL' }
}

function fetchCompleteCkData(results) {
    return { type: 'FETCH_COMPLETE_CK_DATA_ALL', results: results }
}

function startingFetch() {
    return { type: 'STARTING_FETCH_ALL' }
}

function fetchComplete() {
    return { type: 'FETCH_COMPLETE_ALL' }
}

function setCards(cards) {
    return { type: 'SET_CARDS_ALL', cards: cards }
}

function setCheckboxes(checkboxes) {
    return { type: 'SET_CHECKBOXES_ALL', checkboxes: checkboxes }
}

function toggleSearchValue(searchText, valueType, inputType) {
    return { type: 'TOGGLE_SEARCH_VALUE_ALL', searchText: searchText, valueType: valueType, inputType: inputType }
}

function setSearchValues(searchValues) {
    return { type: 'SET_SEARCH_VALUES_ALL', searchValues: searchValues }
}

function setAllPageNumber(page) {
    return { type: 'SET_ALL_PAGE_NUMBER', page: page }
}

function setCardAnimation(animation) {
    return { type: 'SET_CARD_ANIMATION_ALL', animation: animation }
}

function setGeneration(change) {
    return { type: 'SET_GENERATION_ALL', change: change }
}

function toggleGeneration() {
    return { type: 'TOGGLE_GENERATION_ALL' }
}

function setInitialLoad() {
    return { type: 'SET_INITIAL_LOAD_ALL' }
}

function setInitialToggle() {
    return { type: 'SET_INITIAL_TOGGLE_ALL' }
}

function setSort(order) {
    return { type: 'SET_SORT_ALL', order: order }
}

function setActive(active) {
    return { type: 'SET_ACTIVE', active: active }
}

function setResultsChanged(changed) {
    return { type: 'SET_RESULTS_CHANGED_ALL', changed: changed }
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
        dispatch(startingFetchAllIds())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        let url = 'https://api.cryptokitties.co/kitties?limit=20'
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

                ids = j.kitties.map((auction) => { return auction.id })

                let total = j.total
                console.log("################### ids", ids)
                dispatch(fetchCompleteAllIds(ids, total))
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


module.exports = { 
    getCatIds,
    setCards,
    setAllPageNumber,
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