import React, { Component } from 'react';
import { Card, CardTitle, Collection, CollectionItem, Icon, Input } from 'react-materialize'
import { connect } from 'react-redux'


class Sort extends Component {

    render() {

        return (
            <div className='col s12 m12 l12 xl12 ml-4 pl-4 pr-4' style={{ marginTop: '-25px', marginBottom: '-20px' }}>
                <div className='pr-4'>
                    <Input s={12} m={3} l={3} type='select' defaultValue={this.props.sort} onChange={this.props.handleSort}>
                        <option value={false}>Youngest</option>
                        <option value='orderDirection=asc'>Oldest</option>
                        <option value='orderBy=current_price&orderDirection=asc'>Cheapest</option>
                        <option value='orderBy=current_price&orderDirection=desc'>Expensive</option>
                    </Input>
                </div>
            </div>
        )
    }
}


function mapStateToProps(appState) {
    if (appState.salesPage.active === 'sale') {
        return {
            sort: appState.salesPage.sort
        }
    } else if (appState.sirePage.active === 'sire') {
        return {
            sort: appState.sirePage.sort
        }
    } else if (appState.allPage.active === 'all') {
        return {
            sort: appState.allPage.sort
        }
    }

}


export default connect(mapStateToProps)(Sort);