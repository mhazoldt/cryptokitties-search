import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Button, Icon, Pagination, Input } from 'react-materialize'

import {
    getCatIds,
    setCards,
    setSirePageNumber,
    getAllCattributes,
    setCheckboxes,
    setSearchValues,
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
import GenerationSelect from './GenerationSelect'
import Sort from './Sort'
import Results from './Results'
import ResultsPagination from './ResultsPagination'


class Sire extends Component {
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
        let valuesSorted = {}

        // create properties that are an empty array for each type/category
        searchValues.forEach((value) => {
            valuesSorted[value.type] = []

        })

        // sort each cattribute into the property for it's type
        searchValues.forEach((value) => {
            valuesSorted[value.type].push(value)

        })

        let checkboxes = []

        let searchInputData = [
            {
                icon: 'color_lens',
                heading: 'Color',
                inputs: valuesSorted.color,
                inputType: 'checkbox'
            },
            {
                icon: 'accessibility',
                heading: 'Body Color',
                inputs: valuesSorted.colorbody,
                inputType: 'radio'
            },
            {
                icon: 'accessibility',
                heading: 'Body',
                inputs: valuesSorted.body,
                inputType: 'radio'
            },
            {
                icon: 'visibility',
                heading: 'Eye Color',
                inputs: valuesSorted.coloreyes,
                inputType: 'radio'
            },
            {
                icon: 'visibility',
                heading: 'Eyes',
                inputs: valuesSorted.eyes,
                inputType: 'radio'
            },
            {
                icon: 'fingerprint',
                heading: 'Pattern',
                inputs: valuesSorted.pattern,
                inputType: 'radio'
            },
            {
                icon: 'insert_emoticon',
                heading: 'Mouth',
                inputs: valuesSorted.mouth,
                inputType: 'radio'
            },
            {
                icon: 'query_builder',
                heading: 'Cooldown',
                inputs: valuesSorted.cooldown,
                inputType: 'radio'
            },
            {
                icon: 'linear_scale',
                heading: 'Type',
                inputs: valuesSorted.ckType,
                inputType: 'radio'
            }

        ]

        searchInputData.forEach((category, index) => {
            let heading = <div className='col s12 m12 l12 xl12'><h5><Icon left={true} className='icon-margin' small>{category.icon}</Icon>{category.heading}</h5></div>
            checkboxes.push(heading)
            category.inputs.forEach((input, checkboxIndex) => {

                let nextInput = <div className='col checkbox-col'><Input name={input.type} type={category.inputType} onClick={this.handleCheckbox} value={input.searchText} label={input.text} /></div>

                if (input.value) {
                    nextInput = <div className='col checkbox-col'><Input name={input.type} type={category.inputType} onClick={this.handleCheckbox} value={input.searchText} label={input.text} checked /></div>

                }
                checkboxes.push(nextInput)
            })

        })

        let sortHeading = <div className='col s12 m12 l12 xl12'><h5><Icon left={true} className='icon-margin' small>view_comfy</Icon>Sort</h5></div>
        checkboxes.push(sortHeading)

        let sort = <Sort handleSort={this.handleSort} />
        checkboxes.push(sort)

        let generationHeading = <div className='col s12 m12 l12 xl12'><h5><Icon left={true} className='icon-margin' small>line_style</Icon>Generation</h5></div>
        checkboxes.push(generationHeading)

        let generationSearch = <GenerationSelect
            setGeneration={setGeneration}
            toggleGeneration={toggleGeneration}
            setInitialToggle={setInitialToggle}
        />
        checkboxes.push(generationSearch)

        let searchButton = <div className='col s12 m12 l12 xl12'><Button className='mt-3 red lighten-2' value='1' onClick={this.search} waves='light'>Search</Button></div>
        checkboxes.push(searchButton)

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
        this.props.dispatch(setSirePageNumber(page))

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
        this.props.dispatch(setActive('sire'))
    }

    componentDidMount() {
        console.log(this.props.ckData)
        if (this.props.ckData.length === 0) {
            this.props.dispatch(getCatIds())
        }

        // this gets the initial list of catributes,
        // sets search values and generates checkboxes
        if (this.props.allCattributes.length === 0) {
            this.props.dispatch(getAllCattributes())
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

        // when allCattributes updates set search values
        if (this.props.allCattributes != nextProps.allCattributes) {

            let searchValues = []

            nextProps.allCattributes.forEach((cattribute) => {
                // take each cattribute and add it to an array to track input selection in redux
                searchValues.push({ text: cattribute.description, searchText: cattribute.description, value: false, type: cattribute.type, total: cattribute.total })
            })

            let cooldowns = ['fast', 'swift', 'snappy', 'brisk', 'plodding', 'slow', 'sluggish', 'catatonic']

            cooldowns.forEach((cooldown) => {

                searchValues.push({ text: cooldown, searchText: `cooldown:${cooldown}`, value: false, type: 'cooldown' })
            })

            let nfe = ['normal', 'fancy', 'exclusive']

            nfe.forEach((ckType) => {

                searchValues.push({ text: ckType, searchText: `type:${ckType}`, value: false, type: 'ckType' })
            })

            searchValues.push({ text: 'generation', searchText: `gen:${this.props.generation}`, value: false, type: 'generation' })

            this.props.dispatch(setSearchValues(searchValues))

        }

        if (this.props.searchValues != nextProps.searchValues) {
            this.generateCheckboxes(nextProps.searchValues)
        }

        // when ckData updates generate new cards
        if (this.props.cards != nextProps.cards) {
            this.props.dispatch(setCardAnimation('intro'))
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
                {!this.props.isFetchingAllCattributes &&
                    <Row className={checkboxClass}>
                        {this.props.checkboxes}
                    </Row>
                }
                {this.props.isFetchingAllCattributes &&

                    <div className='center-align mt-4 pt-4 animated fadeIn' style={{ minHeight: '100vh' }}>

                        <div class="preloader-wrapper big active">
                            <div class="spinner-layer spinner-blue">
                                <div class="circle-clipper left">
                                    <div class="circle"></div>
                                </div><div class="gap-patch">
                                    <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                }
                <div ref={(thisTag) => { this.resultsHeading = thisTag }}></div>

                <div style={{ minHeight: '100vh' }}>

                    <h5 className='ml-3 pt-2'>Results: <Results value={results} setResultsChanged={setResultsChanged} /></h5>

                    {this.props.total > 20 &&
                        <ResultsPagination startSearch={this.search} />  
                    }

                    <div className='row' id='cardRow' ref={this.saveElement}>
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
        isFetchingSireIds: appState.sirePage.isFetchingSalesIds,
        sireIds: appState.sirePage.sireIds,
        isFetchingCkData: appState.sirePage.isFetchingCkData,
        ckData: appState.sirePage.ckData,
        cards: appState.sirePage.cards,
        sirePageNumber: appState.sirePage.salesPageNumber,
        isFetching: appState.sirePage.isFetching,
        isFetchingAllCattributes: appState.sirePage.isFetchingAllCattributes,
        allCattributes: appState.sirePage.allCattributes,
        checkboxes: appState.sirePage.checkboxes,
        searchValues: appState.sirePage.searchValues,
        total: appState.sirePage.total,
        cardAnimation: appState.sirePage.cardAnimation,
        generation: appState.sirePage.generation,
        initialLoad: appState.sirePage.initialLoad,
        sort: appState.sirePage.sort,
        total: appState.baseLayout.total

    }

}

export default connect(mapStateToProps)(Sire);