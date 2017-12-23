
import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { setGeneration, toggleGeneration, setInitialToggle } from '../redux/sale/actionCreators'
import { Input } from 'react-materialize'

class GenerationSelect extends Component {


    handleToggle = () => {

        if (this.props.initialToggle) {
            this.props.dispatch(this.props.setInitialToggle())
        }

        this.props.dispatch(this.props.toggleGeneration())
        

    }


    render() {


        console.log("alsfjlaskdjf;lkasjd;flkajs;ldkfja;lskdjf;alksdjf", this.props.initialToggle)
        return (
            <div className='col s12 m12 l12 xl12'>
                <div className='pl-3'>

                    <div className='switch'>

                        {this.props.generationEnabled &&
                            <label>
                                Off <input type="checkbox" onClick={this.handleToggle} checked="checked" />
                                <span className="lever"></span> On
                            </label>

                        }
                        {!this.props.generationEnabled &&
                            <label>
                                Off <input type="checkbox" onClick={this.handleToggle}  />
                                <span className="lever"></span> On
                            </label>
                            

                        }



                        {this.props.generationEnabled &&
                            <span className='generation-search ml-2 mt-3' style={{display: 'block'}}>
                                <span className='btn waves-effect waves-light mr-3 animated bounceIn' onClick={() => { this.props.dispatch(this.props.setGeneration('decrease')) }}><i className='material-icons'>chevron_left</i></span>
                                <span className='btn generation-number teal lighten-5 animated bounceIn'>{this.props.generation}</span>
                                <span className='btn waves-effect waves-light ml-3 animated bounceIn' onClick={() => { this.props.dispatch(this.props.setGeneration('increase')) }}><i className='material-icons'>chevron_right</i></span>
                            </span>

                        }


                        {(!this.props.generationEnabled && !this.props.initialToggle) &&
                            <span className='generation-search ml-2 mt-3' style={{display: 'block'}}>
                                <span className='btn waves-effect waves-light mr-3 animated bounceOut'><i className='material-icons'>chevron_left</i></span>
                                <span className='btn generation-number teal lighten-5 animated bounceOut'>{this.props.generation}</span>
                                <span className='btn waves-effect waves-light ml-3 animated bounceOut'><i className='material-icons'>chevron_right</i></span>
                            </span>

                        }
                        {(!this.props.generationEnabled && this.props.initialToggle) &&
                            <span className='generation-search ml-2 mt-3' style={{ display: 'block', visibility: 'hidden' }}>
                                <span className='btn waves-effect waves-light mr-3'><i className='material-icons'>chevron_left</i></span>
                                <span className='btn generation-number teal lighten-5'>{this.props.generation}</span>
                                <span className='btn waves-effect waves-light ml-3'><i className='material-icons'>chevron_right</i></span>
                            </span>

                        }

                    </div>

                </div>
            </div>

        )
    }
}


function mapStateToProps(appState) {
    if (appState.salesPage.active === 'sale') {
        return {
            generation: appState.salesPage.generation,
            generationEnabled: appState.salesPage.generationEnabled,
            initialToggle: appState.salesPage.initialToggle
        }
    } else if (appState.sirePage.active  === 'sire') {
        return {
            generation: appState.sirePage.generation,
            generationEnabled: appState.sirePage.generationEnabled,
            initialToggle: appState.sirePage.initialToggle
        }
    } else if (appState.allPage.active  === 'all') {
        return {
            generation: appState.allPage.generation,
            generationEnabled: appState.allPage.generationEnabled,
            initialToggle: appState.allPage.initialToggle
        }
    } 
    

}


export default connect(mapStateToProps)(GenerationSelect);

