import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row } from 'react-materialize'

import {
    getCatIds,
    setCards,
    setSirePageNumber,
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
} from '../redux/sire/actionCreators'

import ResultCard from './ResultCard'
import Results from './Results'
import ResultsPagination from './ResultsPagination'
import LoadingCircle from './LoadingCircle'
import Checkboxes from './Checkboxes'


class Sire extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this)
    }


    generateCards(kittyData) {
        let cards = kittyData.map((kitty) => {
            return <ResultCard ckData={kitty} key={`card-${kitty.id}-sire`} />
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
                            
                            page='sire'

                            />
        this.props.dispatch(setCheckboxes(checkboxes))
    }


    search(page) {
        this.resultsHeading.scrollIntoView()

        this.props.dispatch(setCardAnimation('outro'))

        let searchText = []
        let checkboxes = this.props.searchValues
        let offset

        // console.log("############### searchValues", this.props.searchValues)
        checkboxes.forEach((checkbox) => {
            if (checkbox.value) {
                searchText.push(checkbox.searchText)
            }
        })

        let searchString = searchText.join('+')

        // console.log("################## searchString #########", searchString)
        if (page) {
            offset = (page * 20) - 20
            // console.log("page", page)
            // console.log("offset", offset)
        } else {
            offset = null
            page = 1
        }

        let sort = this.props.sort

        this.props.dispatch(getCatIds(offset, searchString, sort))
        this.props.dispatch(setSirePageNumber(page))
    }


    handleCheckbox = (e) => {
        // console.log(e.currentTarget.value)
        // console.log(e.currentTarget.name)
        // console.log(e.currentTarget.type)

        // the search text
        let inputValue = e.currentTarget.value

        // the cattribute category/type
        let inputName = e.currentTarget.name

        // checkbox or radio input type
        let inputType = e.currentTarget.type

        this.props.dispatch(toggleSearchValue(inputValue, inputName, inputType))
    }


    handleSort = (e) => {
        // console.log("############ sort value #########", e.currentTarget.value)
        this.props.dispatch(setSort(e.currentTarget.value))
    }


    componentWillMount() {
        this.props.dispatch(setActive('sire'))
    }


    componentDidMount() {
        // this does the initial search before any inputs are selected
        if (this.props.ckData.length === 0) {
            this.props.dispatch(getCatIds())
        }

        // this generates the initial checkboxes after getAllCattributes() from
        // BaseLayout has set the searchValues
        if (this.props.searchValues.length !== 0) {
            this.generateCheckboxes(this.props.searchValues)

        }
    }


    componentWillUnmount() {
        // this keeps track of if the component has loaded before
        // so the intro animation for the search inputs only
        // plays once
        if (this.props.initialLoad) {
            this.props.dispatch(setInitialLoad())
        }
    }


    componentWillReceiveProps(nextProps) {
        // when ckData updates generate new cards
        if (this.props.ckData !== nextProps.ckData) {
            this.generateCards(nextProps.ckData)
        }

        // to make the radio inputs act more like checkboxes (being able to uncheck them)
        // new checkboxes have to be generated after every input/change in searchValues
        if (this.props.searchValues !== nextProps.searchValues) {
            this.generateCheckboxes(nextProps.searchValues)
        }

        // when new cards have been generated make them visible on the page
        // by setting the card animation to intro
        if (this.props.cards !== nextProps.cards) {
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
                <h4 className='center-align page-heading animated flipInY'><u>Sire</u></h4>
                {this.props.searchValues.length !== 0 &&
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
        ckData: appState.sirePage.ckData,
        cards: appState.sirePage.cards,
        sirePageNumber: appState.sirePage.salesPageNumber,
        checkboxes: appState.sirePage.checkboxes,
        searchValues: appState.sirePage.searchValues,
        initialLoad: appState.sirePage.initialLoad,
        sort: appState.sirePage.sort,
        total: appState.sirePage.total
    }
}


export default connect(mapStateToProps)(Sire)