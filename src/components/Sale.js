import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Button, Icon, Pagination, Input } from 'react-materialize'
import { getCatIds, setCards, setSalesPageNumber, getAllCattributes, setCheckboxes, setSearchValues, toggleSearchValue, setCardAnimation } from '../redux/actionCreators'
import ResultCard from './ResultCard'


class Sale extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);


    }

    generateCards(kittyData) {

        let cards = kittyData.map((kitty) => {

            return (
                <ResultCard ckData={kitty} />
            )

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

        let searchButton = <div className='col s12 m12 l12 xl12'><Button className='mt-3 red lighten-2' value='1' onClick={this.search} waves='light'>Search</Button></div>

        checkboxes.push(searchButton)

        this.props.dispatch(setCheckboxes(checkboxes))

    }

    search(page) {
        console.log("true or false", (page % 1) > -1)
        this.resultsHeading.scrollIntoView()
        // this.animatedElement.classList.add('bounceOutLeft')
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
        this.props.dispatch(getCatIds(offset, searchString))
        this.props.dispatch(setSalesPageNumber(page))

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
                searchValues.push({ text: cattribute.description, searchText: cattribute.description, value: false, type: cattribute.type })
            })

            let cooldowns = ['fast', 'swift', 'snappy', 'brisk', 'plodding', 'slow', 'sluggish', 'catatonic']

            cooldowns.forEach((cooldown) => {
                
                searchValues.push({ text: cooldown, searchText: `cooldown:${cooldown}`, value: false, type: 'cooldown' })
            })

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
        return (
            <div>
                <h4 className='center-align page-heading animated fadeIn'><u>Sale</u></h4>
                {!this.props.isFetchingAllCattributes &&
                    <Row className='search-width animated fadeIn'>
                        {this.props.checkboxes}
                    </Row>
                }
                {this.props.isFetchingAllCattributes &&

                    <div className='center-align mt-4 pt-4 animated fadeIn' style={{ minHeight: '100vh' }}>
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-red-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                }
                <div ref={(thisTag) => { this.resultsHeading = thisTag }}></div>
                
                <div style={{minHeight: '100vh'}}>
                    <h5 className='ml-3 pt-2 animated fadeIn'>Results: {results}</h5>
                    {this.props.total > 20 &&
                        <div className='mb-4 animated fadeIn' style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                            <span><Pagination items={parseInt(this.props.total / 20) + 1} activePage={this.props.salesPageNumber} maxButtons={5} onSelect={this.search} /></span>
                        </div>
                    }

                    <div className='row' id='cardRow' ref={this.saveElement}>
                        {this.props.cards}
                    </div>
                    
                    {this.props.total > 20 &&
                        <div className='mb-4 animated fadeIn' style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                            <span><Pagination items={parseInt(this.props.total / 20) + 1} activePage={this.props.salesPageNumber} maxButtons={5} onSelect={this.search} /></span>

                        </div>

                    }
                </div>
                

            </div>
        )
    }

}


function mapStateToProps(appState) {
    return {
        isFetchingSalesIds: appState.salesPage.isFetchingSalesIds,
        salesIds: appState.salesPage.salesIds,
        isFetchingCkData: appState.salesPage.isFetchingCkData,
        ckData: appState.salesPage.ckData,
        cards: appState.salesPage.cards,
        salesPageNumber: appState.salesPage.salesPageNumber,
        isFetching: appState.salesPage.isFetching,
        isFetchingAllCattributes: appState.salesPage.isFetchingAllCattributes,
        allCattributes: appState.salesPage.allCattributes,
        checkboxes: appState.salesPage.checkboxes,
        searchValues: appState.salesPage.searchValues,
        total: appState.salesPage.total,
        cardAnimation: appState.salesPage.cardAnimation

    }

}

export default connect(mapStateToProps)(Sale);
