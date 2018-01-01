import React, { Component } from 'react';
import { connect } from 'react-redux'


class Results extends Component {


    componentWillReceiveProps(nextProps) {
            this.props.dispatch(this.props.setResultsChanged(this.props.value))
    }

    render() {

        return (
            <span>
                {this.props.resultsChanged !== this.props.value &&
                    <h5 className='animated flipInX' style={{ display: 'inline-block', marginTop: '0px' }}>{this.props.value}</h5>
                }
                {this.props.resultsChanged === this.props.value &&
                    <h5 style={{ display: 'inline-block', marginTop: '0px' }}>{this.props.value}</h5>
                    
                }
            </span>
        )
    }
}


function mapStateToProps(appState) {
    if (appState.salesPage.active === 'sale') {
        return {
            cardAnimation: appState.salesPage.cardAnimation,
            resultsChanged: appState.salesPage.resultsChanged
        }
    } else if (appState.sirePage.active === 'sire') {
        return {
            cardAnimation: appState.sirePage.cardAnimation,
            resultsChanged: appState.sirePage.resultsChanged
        }
    } else if (appState.allPage.active === 'all') {
        return {
            cardAnimation: appState.allPage.cardAnimation,
            resultsChanged: appState.allPage.resultsChanged
        }
    }
}


export default connect(mapStateToProps)(Results);