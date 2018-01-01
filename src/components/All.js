import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Button, Icon, Input } from 'react-materialize'

import {
    getCatIds,
    setCards,
    setAllPageNumber,
    setCheckboxes,
    toggleSearchValue,
    setCardAnimation,
    setGeneration,
    toggleGeneration,
    setInitialToggle,
    setInitialLoad,
    setSort,
    setActive,
    setResultsChanged
} from '../redux/all/actionCreators'

import ResultCard from './ResultCard'
import GenerationSelect from './GenerationSelect'
import Sort from './Sort'
import Results from './Results'
import ResultsPagination from './ResultsPagination'
import LoadingCircle from './LoadingCircle'
import Checkboxes from './Checkboxes'


class All extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);

    }

    generateCards(kittyData) {
        let cards = kittyData.map((kitty) => {
            return <ResultCard ckData={kitty} />
        })

        this.props.dispatch(setCards(cards))
    }


    generateCheckboxes(searchValues) {
        let checkboxes = <Checkboxes 
                            searchValues={searchValues} 
                            handleCheckbox={this.handleCheckbox} 
                            search={this.search} 
                            
                            handleSort={this.handleSort}

                            setGeneration={setGeneration}
                            toggleGeneration={toggleGeneration}
                            setInitialToggle={setInitialToggle}
                            
                            />
        this.props.dispatch(setCheckboxes(checkboxes))
    }


    search(page) {
        console.log("true or false", (page % 1) > -1)
        this.resultsHeading.scrollIntoView()

        this.props.dispatch(setCardAnimation('outro'))

        let searchText = []
        let checkboxes = this.props.searchValues
        let offset

        console.log("############### searchValues", this.props.searchValues)
        checkboxes.forEach((checkbox) => {
            if (checkbox.value) {
                searchText.push(checkbox.searchText)
            }
        })

        let searchString = searchText.join('+')

        console.log("################## searchString #########", searchString)
        if ((page % 1) > -1) {
            offset = (page * 20) - 20
            console.log("page", page)
            console.log("offset", offset)
        } else {
            offset = null
            page = 1
        }

        let sort = this.props.sort

        this.props.dispatch(getCatIds(offset, searchString, sort))
        this.props.dispatch(setAllPageNumber(page))

    }

    handleCheckbox = (e) => {
        console.log(e.currentTarget.value)
        console.log(e.currentTarget.name)
        console.log(e.currentTarget.type)

        // the search text
        let inputValue = e.currentTarget.value

        // the cattribute category/type
        let inputName = e.currentTarget.name

        // checkbox or radio input type
        let inputType = e.currentTarget.type

        this.props.dispatch(toggleSearchValue(inputValue, inputName, inputType))

    }


    handleSort = (e) => {
        console.log("############ sort value #########", e.currentTarget.value)
        this.props.dispatch(setSort(e.currentTarget.value))


    }

    componentWillMount() {
        this.props.dispatch(setActive('all'))
    }


    componentDidMount() {
        console.log(this.props.ckData)
        if (this.props.ckData.length === 0) {
            this.props.dispatch(getCatIds())
        }

        if (this.props.searchValues.length != 0) {
            this.generateCheckboxes(this.props.searchValues)

        }

    }

    componentWillUnmount() {
        if (this.props.initialLoad) {
            this.props.dispatch(setInitialLoad())
        }

    }

    componentWillReceiveProps(nextProps) {

        // when ckData updates generate new cards
        if (this.props.ckData != nextProps.ckData) {
            this.generateCards(nextProps.ckData)
        }

        if (this.props.searchValues != nextProps.searchValues) {
            this.generateCheckboxes(nextProps.searchValues)
        }

        // when ckData updates generate new cards
        if (this.props.cards != nextProps.cards) {
            this.props.dispatch(setCardAnimation('not-visible'))
            setTimeout(() => {this.props.dispatch(setCardAnimation('intro'))}, 250)

        }
    }


    render() {

        let addCommas = (number) => {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        let results = addCommas(this.props.total)

        let checkboxClass
        if (this.props.initialLoad) {
            checkboxClass = 'search-width animated fadeInDownBig'
        } else {
            checkboxClass = 'search-width'
        }

        return (
            <div>
                <h4 className='center-align page-heading animated flipInY'><u>All</u></h4>
                {this.props.searchValues.length != 0 &&
                    <Row className={checkboxClass}>
                        {this.props.checkboxes}
                    </Row>
                }
                {this.props.searchValues.length === 0 &&

                    <LoadingCircle />

                }
                <div ref={(thisTag) => { this.resultsHeading = thisTag }}></div>

                <div style={{ minHeight: '100vh' }}>

                    <h5 className='ml-3 pt-2'>Results: <Results value={results} setResultsChanged={setResultsChanged} /></h5>

                    {this.props.total > 20 &&
                        <ResultsPagination startSearch={this.search} />
                    }

                    <div className='row'>
                        {this.props.cards}
                    </div>

                    {this.props.total > 20 &&
                        <ResultsPagination startSearch={this.search} />
                    }
                </div>


            </div>
        )
    }

}


function mapStateToProps(appState) {
    return {
        ckData: appState.allPage.ckData,
        cards: appState.allPage.cards,
        allPageNumber: appState.allPage.allPageNumber,
        checkboxes: appState.allPage.checkboxes,
        searchValues: appState.allPage.searchValues,
        initialLoad: appState.allPage.initialLoad,
        sort: appState.allPage.sort,
        total: appState.allPage.total

    }

}

export default connect(mapStateToProps)(All);