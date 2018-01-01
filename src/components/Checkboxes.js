import React, { Component } from 'react';
import { Input, Icon, Button } from 'react-materialize'
import { connect } from 'react-redux'
import GenerationSelect from './GenerationSelect'
import Sort from './Sort'


class Checkboxes extends Component {

    render() {
        let searchValues = this.props.searchValues
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
                icon: 'terrain',
                heading: 'Wild',
                inputs: valuesSorted.wild,
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

                let nextInput = <div className='col checkbox-col'><Input name={input.type} type={category.inputType} onClick={this.props.handleCheckbox} value={input.searchText} label={input.text} /></div>

                if (input.value) {
                    nextInput = <div className='col checkbox-col'><Input name={input.type} type={category.inputType} onClick={this.props.handleCheckbox} value={input.searchText} label={input.text} checked /></div>

                }
                checkboxes.push(nextInput)
            })

        })

        let sortHeading = <div className='col s12 m12 l12 xl12'><h5><Icon left={true} className='icon-margin' small>view_comfy</Icon>Sort</h5></div>
        checkboxes.push(sortHeading)

        let sort = <Sort handleSort={this.props.handleSort} />

        checkboxes.push(sort)

        let generationHeading = <div className='col s12 m12 l12 xl12'><h5><Icon left={true} className='icon-margin' small>line_style</Icon>Generation</h5></div>
        checkboxes.push(generationHeading)

        let generationSearch = <GenerationSelect
            setGeneration={this.props.setGeneration}
            toggleGeneration={this.props.toggleGeneration}
            setInitialToggle={this.props.setInitialToggle}
        />
        checkboxes.push(generationSearch)

        let searchButton = <div className='col s12 m12 l12 xl12'><Button className='mt-3 red lighten-2' value='1' onClick={this.props.search} waves='light'>Search</Button></div>
        checkboxes.push(searchButton)

        return checkboxes
        
    }
}



export default Checkboxes