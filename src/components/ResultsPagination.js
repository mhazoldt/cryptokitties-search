
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Pagination } from 'react-materialize'


class ResultsPagination extends Component {

    render() {
        return (
            <div className='mb-4 animated fadeIn' style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                <span><Pagination items={parseInt(this.props.total / 20, 10) + 1} activePage={this.props.pageNumber} maxButtons={5} onSelect={this.props.startSearch} /></span>
            </div>

        )
    }
}


function mapStateToProps(appState) {
    if (appState.salesPage.active === 'sale') {
        return {
            pageNumber: appState.salesPage.salesPageNumber,
            total: appState.salesPage.total
            
        }
    } else if (appState.sirePage.active === 'sire') {
        return {
            pageNumber: appState.sirePage.sirePageNumber,
            total: appState.sirePage.total
            
        }
    } else if (appState.allPage.active === 'all') {
        return {
            pageNumber: appState.allPage.allPageNumber,
            total: appState.allPage.total
            
        }
    }


}


export default connect(mapStateToProps)(ResultsPagination);